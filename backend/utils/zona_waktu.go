package utils

import (
	"time"
)

func GetTodayRangeWITA() (string, string, error) {
	loc, err := time.LoadLocation("Asia/Makassar")
	if err != nil {
		return "", "", err
	}

	now := time.Now().In(loc)

	start := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, loc)
	end := start.Add(24 * time.Hour)

	return start.Format("2006-01-02 15:04:05"),
		end.Format("2006-01-02 15:04:05"),
		nil
}
