import { NextPageWithLayout } from 'types'
import DefaultLayout from 'components/layouts/DefaultLayout'
import AuthLayout from 'components/layouts/AuthLayout/AuthLayout'
import { ScaffoldContainer, ScaffoldSection } from 'components/layouts/Scaffold'
import { PageLayout } from 'components/layouts/PageLayout/PageLayout'
import { DocsButton } from 'components/ui/DocsButton'
import { DOCS_URL } from 'lib/constants'
import { OverviewMonitoring } from 'components/interfaces/Auth/Overview/OverviewMonitoring'
import { OverviewUsage } from 'components/interfaces/Auth/Overview/OverviewUsage'
import { OverviewLearnMore } from 'components/interfaces/Auth/Overview/OverviewLearnMore'
import { useRouter } from 'next/router'
import { useFlag, useParams } from 'common'
import { useEffect } from 'react'

const AuthOverview: NextPageWithLayout = () => {
  const router = useRouter()
  const { ref } = useParams()
  const authOverviewPageEnabled = useFlag('authOverviewPage')

  useEffect(() => {
    if (!authOverviewPageEnabled) {
      router.push(`/project/${ref}/auth/users`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authOverviewPageEnabled, router, ref])

  if (!authOverviewPageEnabled) {
    return null
  }

  return (
    <ScaffoldContainer size="large">
      <ScaffoldSection isFullWidth>
        <div className="mb-4 flex flex-col gap-6">
          <OverviewMonitoring />
          <OverviewUsage />
          <OverviewLearnMore />
        </div>
      </ScaffoldSection>
    </ScaffoldContainer>
  )
}

AuthOverview.getLayout = (page) => (
  <DefaultLayout>
    <AuthLayout>
      <PageLayout
        title="Overview"
        secondaryActions={<DocsButton href={`${DOCS_URL}/guides/auth`} />}
        size="large"
      >
        {page}
      </PageLayout>
    </AuthLayout>
  </DefaultLayout>
)

export default AuthOverview
