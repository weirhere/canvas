import { useState } from 'react'
import { DialRoot } from 'dialkit'
import 'dialkit/styles.css'
import './App.css'
import ScatteredCards from './ScatteredCards'
import Grid from './Grid'
import Modal from './Modal'
import Toast from './Toast'
import PageTransition from './PageTransition'

const DEMOS = [
  { id: 'cards', label: 'Cards', component: ScatteredCards },
  { id: 'grid', label: 'Grid', component: Grid },
  { id: 'modal', label: 'Modal', component: Modal },
  { id: 'toast', label: 'Toast', component: Toast },
]

export default function App() {
  const [activeId, setActiveId] = useState('cards')
  const ActiveComponent = DEMOS.find((d) => d.id === activeId).component

  return (
    <>
      <div className="layout">
        <nav className="sidebar">
          <h1 className="sidebar-logo">Canvas</h1>
          {DEMOS.map((demo) => (
            <button
              key={demo.id}
              onClick={() => setActiveId(demo.id)}
              className={`nav-item ${activeId === demo.id ? 'nav-item--active' : ''}`}
            >
              {demo.label}
            </button>
          ))}
        </nav>
        <main className="content">
          <PageTransition pageKey={activeId}>
            <ActiveComponent />
          </PageTransition>
        </main>
      </div>
      <DialRoot />
    </>
  )
}
