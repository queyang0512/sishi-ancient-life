package httpapi

import (
	"encoding/json"
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"path/filepath"
	"testing"

	"traditional-culture/backend/internal/database"
)

func TestSearchUsesSeededContentAndSolarTermRelations(t *testing.T) {
	db, err := database.Open(filepath.Join(t.TempDir(), "content.db"))
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	router := NewRouter(db, slog.New(slog.NewTextHandler(io.Discard, nil)))
	request := httptest.NewRequest(http.MethodGet, "/api/search?q=%E7%99%BD%E9%9C%B2", nil)
	response := httptest.NewRecorder()
	router.ServeHTTP(response, request)

	if response.Code != http.StatusOK {
		t.Fatalf("expected status %d, got %d", http.StatusOK, response.Code)
	}
	var payload struct {
		Results []searchResult `json:"results"`
	}
	if err := json.Unmarshal(response.Body.Bytes(), &payload); err != nil {
		t.Fatal(err)
	}
	if len(payload.Results) < 8 {
		t.Fatalf("expected all White Dew entries and the solar term, got %d results", len(payload.Results))
	}
}

func TestContentItemsExposeEvidenceMetadata(t *testing.T) {
	db, err := database.Open(filepath.Join(t.TempDir(), "content.db"))
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	router := NewRouter(db, slog.New(slog.NewTextHandler(io.Discard, nil)))
	request := httptest.NewRequest(http.MethodGet, "/api/content/items?term=bailu", nil)
	response := httptest.NewRecorder()
	router.ServeHTTP(response, request)

	if response.Code != http.StatusOK {
		t.Fatalf("expected status %d, got %d", http.StatusOK, response.Code)
	}
	var payload struct {
		Items []contentItem `json:"items"`
	}
	if err := json.Unmarshal(response.Body.Bytes(), &payload); err != nil {
		t.Fatal(err)
	}
	if len(payload.Items) == 0 {
		t.Fatal("expected seeded content items")
	}
	item := payload.Items[0]
	if item.EvidenceLevel == "" || item.Source == "" || item.SourceType == "" || item.Citation == "" {
		t.Fatalf("expected complete evidence metadata, got %#v", item)
	}
}

func TestEverySolarTermHasPublishedContent(t *testing.T) {
	db, err := database.Open(filepath.Join(t.TempDir(), "content.db"))
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	var missing int
	if err := db.QueryRow(`SELECT COUNT(*) FROM solar_terms st WHERE NOT EXISTS (SELECT 1 FROM culture_item_solar_terms rel JOIN culture_items ci ON ci.id=rel.culture_item_id WHERE rel.solar_term_id=st.id AND ci.status='published')`).Scan(&missing); err != nil {
		t.Fatal(err)
	}
	if missing != 0 {
		t.Fatalf("expected published content for every solar term, got %d uncovered terms", missing)
	}
}
