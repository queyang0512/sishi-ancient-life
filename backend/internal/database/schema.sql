CREATE TABLE IF NOT EXISTS solar_terms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL UNIQUE,
    season TEXT NOT NULL CHECK (season IN ('spring', 'summer', 'autumn', 'winter')),
    sequence INTEGER NOT NULL UNIQUE CHECK (sequence BETWEEN 1 AND 24),
    summary TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS culture_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('food', 'clothing', 'dwelling', 'travel', 'work', 'leisure', 'custom', 'taboo')),
    content TEXT NOT NULL DEFAULT '',
    practice TEXT NOT NULL DEFAULT '',
    reason TEXT NOT NULL DEFAULT '',
    historical_change TEXT NOT NULL DEFAULT '',
    cover_image TEXT NOT NULL DEFAULT '',
    evidence_level TEXT NOT NULL CHECK (evidence_level IN ('A', 'B', 'C', 'D')),
    featured_weight INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL CHECK (type IN ('time', 'period', 'region', 'category')),
    slug TEXT NOT NULL,
    name TEXT NOT NULL,
    UNIQUE(type, slug)
);

CREATE TABLE IF NOT EXISTS culture_item_tags (
    culture_item_id INTEGER NOT NULL REFERENCES culture_items(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (culture_item_id, tag_id)
);

CREATE TABLE IF NOT EXISTS culture_item_solar_terms (
    culture_item_id INTEGER NOT NULL REFERENCES culture_items(id) ON DELETE CASCADE,
    solar_term_id INTEGER NOT NULL REFERENCES solar_terms(id) ON DELETE CASCADE,
    relevance INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (culture_item_id, solar_term_id)
);

CREATE TABLE IF NOT EXISTS culture_item_relations (
    culture_item_id INTEGER NOT NULL REFERENCES culture_items(id) ON DELETE CASCADE,
    related_item_id INTEGER NOT NULL REFERENCES culture_items(id) ON DELETE CASCADE,
    relation_type TEXT NOT NULL DEFAULT 'related',
    PRIMARY KEY (culture_item_id, related_item_id),
    CHECK (culture_item_id <> related_item_id)
);

CREATE TABLE IF NOT EXISTS sources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    culture_item_id INTEGER NOT NULL REFERENCES culture_items(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    author TEXT NOT NULL DEFAULT '',
    citation TEXT NOT NULL,
    source_type TEXT NOT NULL DEFAULT 'document',
    url TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT '',
    summary TEXT NOT NULL,
    body TEXT NOT NULL DEFAULT '',
    cover_image TEXT NOT NULL DEFAULT '',
    featured_weight INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_culture_items_status ON culture_items(status);
CREATE INDEX IF NOT EXISTS idx_culture_items_category ON culture_items(category);
CREATE INDEX IF NOT EXISTS idx_culture_items_featured ON culture_items(featured_weight DESC);
CREATE INDEX IF NOT EXISTS idx_sources_culture_item ON sources(culture_item_id);
CREATE INDEX IF NOT EXISTS idx_stories_status ON stories(status);
CREATE INDEX IF NOT EXISTS idx_stories_featured ON stories(featured_weight DESC);
