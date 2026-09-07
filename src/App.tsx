import { TimeMachine } from './components/TimeMachine/TimeMachine.tsx'
import { ErrorBoundary } from './components/UI/ErrorBoundary.tsx'

export default function App() {
  return (
    <ErrorBoundary>
      <TimeMachine />
    </ErrorBoundary>
  )
}
