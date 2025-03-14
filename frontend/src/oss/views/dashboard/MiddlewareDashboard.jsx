/**
 * Copyright 2024 CloudDetail
 * SPDX-License-Identifier: Apache-2.0
 */

import { CToast, CToastBody } from '@coreui/react'
import React from 'react'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import IframeDashboard from 'src/core/components/Dashboard/IframeDashboard'
import { useTranslation } from 'react-i18next'

function MiddlewareDashboard() {
  const { t, i18n } = useTranslation('oss/middleware')

  
  return (
    <div className="text-xs" style={{ height: 'calc(100vh - 160px)' }}>
      <CToast autohide={false} visible={true} className="align-items-center w-full mb-2">
        <div className="d-flex">
          <CToastBody className=" flex flex-row items-center text-xs">
            <IoMdInformationCircleOutline size={20} color="#f7c01a" className="mr-1" />
            {t('dashboard.toastMessage')}
            <a
              className="underline text-sky-500"
              target="_blank"
              href=
              {
                i18n.language === 'zh'
                ? "https://kindlingx.com/docs/APO%20向导式可观测性中心/配置指南/监控中间件/"
                : "https://docs.autopilotobservability.com/category/metrics-monitoring"
              }
            >
              {t('dashboard.documentation')}
            </a>
          </CToastBody>
        </div>
      </CToast>
      <IframeDashboard dashboardKey="middleware" />
    </div>
  )
}
export default MiddlewareDashboard
