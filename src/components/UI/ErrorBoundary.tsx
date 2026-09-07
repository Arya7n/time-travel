import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode; fallback?: ReactNode }
type State = { failed: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info)
  }

  render() {
    if (this.state.failed) {
      return (
        this.props.fallback ?? (
          <div className="intro">
            <div>
              <p className="intro-sub">TIME MACHINE</p>
              <h1>A FRACTURE IN TIME.</h1>
              <p className="intro-hint">Reload to try the journey again.</p>
            </div>
          </div>
        )
      )
    }
    return this.props.children
  }
}
