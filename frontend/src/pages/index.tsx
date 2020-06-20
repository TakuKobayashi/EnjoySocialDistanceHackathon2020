import * as React from 'react'
import { Link } from 'gatsby'
import { Button } from 'react-rainbow-components'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'

const Video = require('twilio-video')

interface PageProps {
}

class IndexPage extends React.Component<PageProps> {
  constructor(props: any) {
    super(props)
    this.state = {
    }
  }

  render():
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | string
    | number
    | {}
    | React.ReactNodeArray
    | React.ReactPortal
    | boolean
    | null
    | undefined {
    return (
      <IndexLayout>
        <Page>
          <Container>
            <Button shaded label="Button Brand" onClick={() => alert('clicked!')} variant="brand" className="rainbow-m-around_medium" />
          </Container>
        </Page>
      </IndexLayout>
    )
  }
}

export default IndexPage
