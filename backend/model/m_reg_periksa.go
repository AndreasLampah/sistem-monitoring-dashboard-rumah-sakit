package model

import "time"

type RegPeriksa struct {
	NoReg   string `gorm:"column:no_reg" json:"no_reg"`
	NoRawat string `gorm:"column:no_rawat;primaryKey" json:"no_rawat"`

	TglRegistrasi string `gorm:"column:tgl_registrasi" json:"tgl_registrasi"`
	JamReg        string `gorm:"column:jam_reg" json:"jam_reg"`

	KdDokter   string `gorm:"column:kd_dokter" json:"kd_dokter"`
	NoRkmMedis string `gorm:"column:no_rkm_medis" json:"no_rkm_medis"`
	KdPoli     string `gorm:"column:kd_poli" json:"kd_poli"`

	PJawab     string `gorm:"column:p_jawab" json:"p_jawab"`
	AlmtPj     string `gorm:"column:almt_pj" json:"almt_pj"`
	HubunganPj string `gorm:"column:hubunganpj" json:"hubunganpj"`

	BiayaReg float64 `gorm:"column:biaya_reg" json:"biaya_reg"`

	Status       string `gorm:"column:stts" json:"status"`
	StatusDaftar string `gorm:"column:stts_daftar" json:"status_daftar"`
	StatusLanjut string `gorm:"column:status_lanjut" json:"status_lanjut"`
	StatusBayar  string `gorm:"column:status_bayar" json:"status_bayar"`
	StatusPoli   string `gorm:"column:status_poli" json:"status_poli"`

	KdPj string `gorm:"column:kd_pj" json:"kd_pj"`

	UmurDaftar int    `gorm:"column:umurdaftar" json:"umurdaftar"`
	StatusUmur string `gorm:"column:sttsumur" json:"status_umur"`

	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}

func (RegPeriksa) TableName() string {
	return "reg_periksa"
}
