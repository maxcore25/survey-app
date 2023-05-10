import { render, screen, fireEvent } from '@testing-library/react';
import AppButton from '../components/elements/buttons/AppButton';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../hooks/useAuth';

describe('AppButton', () => {
  it('renders AppButton', () => {
    render(<AppButton>hello</AppButton>);
    const button = screen.getByText(/hello/i);
    expect(button).toBeInTheDocument();
  });

  it('renders App', () => {
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

  it('renders App 2', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    const button = screen.getByText(/Войти/i);
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
});
