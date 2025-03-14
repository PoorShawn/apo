// Copyright 2024 CloudDetail
// SPDX-License-Identifier: Apache-2.0

package user

import (
	"errors"
	"github.com/CloudDetail/apo/backend/pkg/code"
	"github.com/CloudDetail/apo/backend/pkg/model"
	"github.com/CloudDetail/apo/backend/pkg/model/request"
	"github.com/CloudDetail/apo/backend/pkg/model/response"
	"github.com/CloudDetail/apo/backend/pkg/repository/database"
)

func (s *service) GetUserInfo(userID int64) (response.GetUserInfoResponse, error) {
	var (
		user database.User
		err  error
		resp response.GetUserInfoResponse
	)

	if userID == 0 {
		user, err = s.dbRepo.GetAnonymousUser()
		resp.User = user
		return resp, err
	}

	exists, err := s.dbRepo.UserExists(userID)
	if err != nil {
		return resp, err
	}

	if !exists {
		return resp, model.NewErrWithMessage(errors.New("user does not exist"), code.UserNotExistsError)
	}

	user, err = s.dbRepo.GetUserInfo(userID)
	if err != nil {
		return resp, err
	}

	resp.User = user
	return resp, nil
}

func (s *service) GetUserList(req *request.GetUserListRequest) (resp response.GetUserListResponse, err error) {
	users, count, err := s.dbRepo.GetUserList(req)
	resp.Users = users
	resp.PageSize = req.PageSize
	resp.CurrentPage = req.CurrentPage
	resp.Total = count
	return
}
