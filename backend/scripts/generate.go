package main

import (
	"backend-golang/config"

	"gorm.io/gen"
)

func main() {
	config.ConnectDB()

	g := gen.NewGenerator(gen.Config{
		OutPath: "repository/query",
		Mode:    gen.WithDefaultQuery,
	})

	g.UseDB(config.DB)

	g.ApplyBasic(
		g.GenerateModel("data_triase_igd"),
	)

	g.Execute()
}
