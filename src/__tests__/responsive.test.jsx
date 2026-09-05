/**
 * TEST: Responsive
 * Verifica que la estructura HTML tiene los elementos semanticos
 * necesarios para que el CSS responsive funcione.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App';

describe('Responsive', () => {
  it('debe tener estructura semantica con nav, main y section', () => {
    // 1. ARRANGE: Renderizar la app
    const { container } = render(<App />);

    // 2. ASSERT: Verificar que existen los elementos HTML semanticos
    expect(container.querySelector('nav')).toBeInTheDocument();
    expect(container.querySelector('main')).toBeInTheDocument();
    expect(container.querySelector('section')).toBeInTheDocument();
  });
});
