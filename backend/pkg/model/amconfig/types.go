// Copyright 2024 CloudDetail
// SPDX-License-Identifier: Apache-2.0

package amconfig

func HasEmailOrWebhookConfig(r Receiver) bool {
	if r.EmailConfigs != nil {
		return true
	} else if r.WebhookConfigs != nil && len(r.WebhookConfigs) > 0 {
		return true
	} else if r.WechatConfigs != nil && len(r.WechatConfigs) > 0 {
		return true
	}

	return false
}
