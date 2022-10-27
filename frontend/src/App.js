import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes } from '~/routes'

function App() {
  return (
    <Router>
      <div className="App grid" style={{height: 1200}}>
        <Routes>
          {
            publicRoutes.map((route, index) => {
              const Page = route.component
              let Layout = route.layout
              if (Layout === null) {
                Layout = Fragment
              }
              return (
                <Route key={index} path={route.path} element={<Layout><Page /></Layout>}/>
              )
            })
          }
        </Routes>
      </div>
    </Router>
  );
}

export default App;
