package structures

type Review struct {
	Id           int    `json:"id"`
	Text         string `json:"review_text"`
	Rating_value int    `json:"rating_value"`
	Reviewed_by  int    `json:"author_id"`
	Recipe_id    int    `json:"recipe_id"`
}
