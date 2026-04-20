package dto

type TotalRanapHarian struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	Total   int64  `json:"total"`
}
