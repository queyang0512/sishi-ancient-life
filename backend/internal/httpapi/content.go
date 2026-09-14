package httpapi

import (
	"database/sql"
	"log/slog"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

type contentItem struct {
	ID            string   `json:"id"`
	Title         string   `json:"title"`
	Summary       string   `json:"summary"`
	Category      string   `json:"category"`
	Term          string   `json:"term"`
	Dynasty       string   `json:"dynasty"`
	Region        string   `json:"region"`
	Image         string   `json:"image"`
	Practice      string   `json:"practice"`
	Reason        string   `json:"reason"`
	History       []string `json:"history,omitempty"`
	Source        string   `json:"source"`
	SourceType    string   `json:"sourceType,omitempty"`
	Citation      string   `json:"citation,omitempty"`
	EvidenceLevel string   `json:"evidenceLevel"`
}

type storyItem struct {
	ID       string   `json:"id"`
	Title    string   `json:"title"`
	Category string   `json:"category"`
	Summary  string   `json:"summary"`
	Image    string   `json:"image"`
	Body     []string `json:"body"`
}

type searchResult struct {
	ID       string `json:"id"`
	Type     string `json:"type"`
	Title    string `json:"title"`
	Summary  string `json:"summary"`
	Image    string `json:"image"`
	Category string `json:"category,omitempty"`
	To       string `json:"to"`
}

func registerContentRoutes(router *gin.Engine, db *sql.DB, logger *slog.Logger) {
	router.GET("/api/content/terms", func(c *gin.Context) {
		rows, err := db.QueryContext(c.Request.Context(), `SELECT slug,name,CASE season WHEN 'spring' THEN '春' WHEN 'summer' THEN '夏' WHEN 'autumn' THEN '秋' ELSE '冬' END,summary FROM solar_terms ORDER BY sequence`)
		if err != nil {
			respondDatabaseError(c, logger, err)
			return
		}
		defer rows.Close()
		terms := make([]gin.H, 0, 24)
		for rows.Next() {
			var slug, name, season, summary string
			if err := rows.Scan(&slug, &name, &season, &summary); err != nil {
				respondDatabaseError(c, logger, err)
				return
			}
			terms = append(terms, gin.H{"slug": slug, "name": name, "season": season, "summary": summary})
		}
		c.JSON(http.StatusOK, gin.H{"terms": terms})
	})

	router.GET("/api/content/items", func(c *gin.Context) {
		category := databaseCategory(c.Query("category"))
		term := strings.TrimSpace(c.Query("term"))
		items, err := queryContentItems(c, db, category, term)
		if err != nil {
			respondDatabaseError(c, logger, err)
			return
		}
		c.JSON(http.StatusOK, gin.H{"items": items})
	})

	router.GET("/api/content/stories", func(c *gin.Context) {
		stories, err := queryStories(c, db)
		if err != nil {
			respondDatabaseError(c, logger, err)
			return
		}
		c.JSON(http.StatusOK, gin.H{"stories": stories})
	})

	router.GET("/api/search", func(c *gin.Context) {
		query := strings.TrimSpace(c.Query("q"))
		if len([]rune(query)) > 80 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "search query is too long"})
			return
		}
		results, err := querySearch(c, db, query, databaseCategory(c.Query("category")))
		if err != nil {
			respondDatabaseError(c, logger, err)
			return
		}
		c.JSON(http.StatusOK, gin.H{"query": query, "results": results})
	})
}

func queryContentItems(c *gin.Context, db *sql.DB, category, term string) ([]contentItem, error) {
	rows, err := db.QueryContext(c.Request.Context(), `
		SELECT ci.slug,ci.title,ci.summary,
		CASE ci.category WHEN 'dwelling' THEN 'home' ELSE ci.category END,
		COALESCE(st.name,''),
		COALESCE((SELECT name FROM tags t JOIN culture_item_tags cit ON cit.tag_id=t.id WHERE cit.culture_item_id=ci.id AND t.type='period' LIMIT 1),''),
		COALESCE((SELECT name FROM tags t JOIN culture_item_tags cit ON cit.tag_id=t.id WHERE cit.culture_item_id=ci.id AND t.type='region' LIMIT 1),''),
		ci.cover_image,ci.practice,ci.reason,ci.historical_change,
		COALESCE((SELECT title FROM sources WHERE culture_item_id=ci.id ORDER BY id LIMIT 1),''),
		COALESCE((SELECT source_type FROM sources WHERE culture_item_id=ci.id ORDER BY id LIMIT 1),''),
		COALESCE((SELECT citation FROM sources WHERE culture_item_id=ci.id ORDER BY id LIMIT 1),''),
		ci.evidence_level
		FROM culture_items ci
		LEFT JOIN culture_item_solar_terms cist ON cist.culture_item_id=ci.id
		LEFT JOIN solar_terms st ON st.id=cist.solar_term_id
		WHERE ci.status='published' AND (?='' OR ci.category=?) AND (?='' OR st.slug=? OR st.name=?)
		ORDER BY ci.featured_weight DESC,ci.id`, category, category, term, term, term)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := make([]contentItem, 0)
	for rows.Next() {
		var item contentItem
		var history string
		if err := rows.Scan(&item.ID, &item.Title, &item.Summary, &item.Category, &item.Term, &item.Dynasty, &item.Region, &item.Image, &item.Practice, &item.Reason, &history, &item.Source, &item.SourceType, &item.Citation, &item.EvidenceLevel); err != nil {
			return nil, err
		}
		if history != "" {
			item.History = strings.Split(history, "\n")
		}
		items = append(items, item)
	}
	return items, rows.Err()
}

func queryStories(c *gin.Context, db *sql.DB) ([]storyItem, error) {
	rows, err := db.QueryContext(c.Request.Context(), `SELECT slug,title,category,summary,cover_image,body FROM stories WHERE status='published' ORDER BY featured_weight DESC,id`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	stories := make([]storyItem, 0)
	for rows.Next() {
		var story storyItem
		var body string
		if err := rows.Scan(&story.ID, &story.Title, &story.Category, &story.Summary, &story.Image, &body); err != nil {
			return nil, err
		}
		story.Body = strings.Split(body, "\n")
		stories = append(stories, story)
	}
	return stories, rows.Err()
}

func querySearch(c *gin.Context, db *sql.DB, query, category string) ([]searchResult, error) {
	pattern := "%" + query + "%"
	results := make([]searchResult, 0)
	rows, err := db.QueryContext(c.Request.Context(), `SELECT slug,title,summary,CASE category WHEN 'dwelling' THEN 'home' ELSE category END,cover_image FROM culture_items ci WHERE status='published' AND (?='' OR category=?) AND (?='' OR title LIKE ? OR summary LIKE ? OR practice LIKE ? OR reason LIKE ? OR EXISTS (SELECT 1 FROM culture_item_solar_terms cist JOIN solar_terms st ON st.id=cist.solar_term_id WHERE cist.culture_item_id=ci.id AND (st.name LIKE ? OR st.summary LIKE ?))) ORDER BY featured_weight DESC LIMIT 30`, category, category, query, pattern, pattern, pattern, pattern, pattern, pattern)
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var result searchResult
		if err := rows.Scan(&result.ID, &result.Title, &result.Summary, &result.Category, &result.Image); err != nil {
			rows.Close()
			return nil, err
		}
		result.Type = "item"
		result.To = "/item/" + result.ID
		results = append(results, result)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if category != "" {
		return results, nil
	}
	if query != "" {
		termRows, err := db.QueryContext(c.Request.Context(), `SELECT slug,name,summary FROM solar_terms WHERE name LIKE ? OR summary LIKE ? ORDER BY sequence`, pattern, pattern)
		if err != nil {
			return nil, err
		}
		for termRows.Next() {
			var result searchResult
			if err := termRows.Scan(&result.ID, &result.Title, &result.Summary); err != nil {
				termRows.Close()
				return nil, err
			}
			result.Type = "term"
			result.Image = "/images/misty-boat.png"
			result.To = "/year/" + result.ID
			results = append(results, result)
		}
		if err := termRows.Close(); err != nil {
			return nil, err
		}
	}
	storyRows, err := db.QueryContext(c.Request.Context(), `SELECT slug,title,summary,category,cover_image FROM stories WHERE status='published' AND (?='' OR title LIKE ? OR summary LIKE ? OR body LIKE ?) ORDER BY featured_weight DESC`, query, pattern, pattern, pattern)
	if err != nil {
		return nil, err
	}
	defer storyRows.Close()
	for storyRows.Next() {
		var result searchResult
		if err := storyRows.Scan(&result.ID, &result.Title, &result.Summary, &result.Category, &result.Image); err != nil {
			return nil, err
		}
		result.Type = "story"
		result.To = "/stories/" + result.ID
		results = append(results, result)
	}
	return results, storyRows.Err()
}

func databaseCategory(category string) string {
	if category == "home" {
		return "dwelling"
	}
	return category
}

func respondDatabaseError(c *gin.Context, logger *slog.Logger, err error) {
	logger.Error("content query failed", "path", c.Request.URL.Path, "error", err)
	c.JSON(http.StatusInternalServerError, gin.H{"error": "content service unavailable"})
}
