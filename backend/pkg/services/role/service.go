// Copyright 2025 CloudDetail
// SPDX-License-Identifier: Apache-2.0

package role

import (
	"github.com/CloudDetail/apo/backend/pkg/model/request"
	"github.com/CloudDetail/apo/backend/pkg/model/response"
	"github.com/CloudDetail/apo/backend/pkg/repository/database"
)

var _ Service = (*service)(nil)

type Service interface {
	RoleOperation(req *request.RoleOperationRequest) error
	GetRoles() (response.GetRoleResponse, error)
	GetUserRole(req *request.GetUserRoleRequest) (response.GetUserRoleResponse, error)
	CreateRole(req *request.CreateRoleRequest) error
	UpdateRole(req *request.UpdateRoleRequest) error
	DeleteRole(req *request.DeleteRoleRequest) error
}

type service struct {
	dbRepo database.Repo
}

func New(dbRepo database.Repo) Service {
	return &service{
		dbRepo: dbRepo,
	}
}
