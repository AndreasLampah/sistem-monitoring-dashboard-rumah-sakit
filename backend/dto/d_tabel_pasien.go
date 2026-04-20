package dto

type PatientTableResponse struct {
	Name   string `json:"name"`
	ID     string `json:"id"`
	Doc    string `json:"doc,omitempty"`
	Ward   string `json:"ward,omitempty"`
	Status string `json:"status"`
	Jenis  string `json:"jenis"` // Baru / Lama
	Masuk  string `json:"masuk"`
}

type PatientTableListResponse struct {
	Success bool                   `json:"success"`
	Message string                 `json:"message"`
	Data    []PatientTableResponse `json:"data"`
}
