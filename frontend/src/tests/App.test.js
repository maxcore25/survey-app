import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../hooks/useAuth';

describe('App', () => {
  it('renders App', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
  });

  it('renders App 2', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    const button = screen.queryByText(/Войти/i);
    expect(button).toBeInTheDocument();
  });

  it('renders App 3', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    const button = screen.getByText(/Войти/i);
    const input = screen.queryByRole('textbox');
    fireEvent.click(button);
    expect(input).toBeInTheDocument();
  });

  it('renders App 4', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('renders App 5', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    const mainEl = document.querySelector('main');
    expect(mainEl).toBeInTheDocument();
  });

  it('renders App 6', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    const inputs = document.querySelectorAll('input');
    expect(inputs.length).toBe(2);
  });
});
