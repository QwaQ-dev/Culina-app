package structures

type User struct {
	Id            int    `json:"id"`
	Email         string `json:"email"`
	Username      string `json:"username"`
	Password      string `json:"password"`
	Role          string `json:"role, omitempty"`
	Sex           string `json:"sex, omitempty"`
	Recipes_count string `json:"receipts_count, omitempty"`
}
