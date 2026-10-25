// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

describe('startup scaleup access office', () => {
  it('loads scaleup cases from the Java API', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: 'Lab-to-market expansion review', owner: 'European Scaleup Support Team', status: 'Review', priority: 'High' }],
    }))
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    render(<QueryClientProvider client={client}><App /></QueryClientProvider>)
    expect(await screen.findByText('Lab-to-market expansion review')).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Startup Scaleup Access Office' })).toBeTruthy()
  })
})
