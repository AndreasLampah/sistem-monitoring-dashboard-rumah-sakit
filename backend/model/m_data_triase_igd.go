package model

import "time"

type DataTriaseIGD struct {
	NoRawat      string    `gorm:"column:no_rawat;type:varchar(17);primaryKey" json:"no_rawat"`
	TglKunjungan time.Time `gorm:"column:tgl_kunjungan;type:datetime" json:"tgl_kunjungan"`

	CaraMasuk        string `gorm:"column:cara_masuk;type:enum('Jalan','Brankar','Kursi Roda','Digendong')" json:"cara_masuk"`
	AlatTransportasi string `gorm:"column:alat_transportasi;type:enum('-','AGD','Sendiri','Swasta')" json:"alat_transportasi"`
	AlasanKedatangan string `gorm:"column:alasan_kedatangan;type:enum('Datang Sendiri','Polisi','Rujukan','Bidan','Puskesmas','Rumah Sakit','Poliklinik','Faskes Lain','-')" json:"alasan_kedatangan"`

	KeteranganKedatangan string `gorm:"column:keterangan_kedatangan;type:varchar(100)" json:"keterangan_kedatangan"`
	KodeKasus            string `gorm:"column:kode_kasus;type:varchar(3)" json:"kode_kasus"`

	TekananDarah string `gorm:"column:tekanan_darah;type:varchar(8)" json:"tekanan_darah"`
	Nadi         string `gorm:"column:nadi;type:varchar(3)" json:"nadi"`
	Pernapasan   string `gorm:"column:pernapasan;type:varchar(3)" json:"pernapasan"`
	Suhu         string `gorm:"column:suhu;type:varchar(5)" json:"suhu"`
	SaturasiO2   string `gorm:"column:saturasi_o2;type:varchar(3)" json:"saturasi_o2"`
	Nyeri        string `gorm:"column:nyeri;type:varchar(5)" json:"nyeri"`
}

// Nama tabel explicit (biar aman)
func (DataTriaseIGD) TableName() string {
	return "data_triase_igd"
}
