package dto

type TotalIgdHarianResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	Total   int64  `json:"total_pasien_igd_harian"`
}
