package dto

type TotalPasienHarianResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	Total   int64  `json:"total"`
}
