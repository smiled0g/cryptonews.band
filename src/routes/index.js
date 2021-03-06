import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import styled from 'styled-components'

import Header from 'components/Header'
import Footer from 'components/Footer'

// Routes
import News from 'routes/news'
import Submit from 'routes/submit'
import Challenge from 'routes/challenge'
import Vote from 'routes/vote'

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 40px 0;
`
const PageContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  background-color: #f9f8ff;
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.2);
`
const Content = styled.div`
  flex: 1;
  display: flex;
  padding: 12px 15px 24px;
  flex-direction: column;
`

export default () => (
  <Container>
    <PageContainer>
      <Header />
      <Content>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <News filter={item => !item.is_proposal} />}
          />
          <Route
            exact
            path="/proposals"
            render={() => <News filter={item => item.is_proposal} />}
          />
          <Route
            exact
            path="/challenges"
            render={() => <News filter={item => item.active_challenge} />}
          />
          <Route exact path="/submit" component={Submit} />
          <Route exact path="/challenge/:id" component={Challenge} />
          <Route exact path="/vote/:id/:choice" component={Vote} />
          <Route exact path="/vote-result/:id" component={Vote} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Content>
      <Footer />
    </PageContainer>
  </Container>
)
