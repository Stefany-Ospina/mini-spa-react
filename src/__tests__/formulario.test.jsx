/**
 * TEST: Formulario
 * Verifica que si se envia el formulario vacio, aparecen errores de validacion.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Inscripcion from '../components/pages/Inscripcion/Inscripcion';

beforeEach(() => {
  // Mock de fetch: simula que el backend responde con lista vacia
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [],
  });
});

describe('Formulario', () => {
  it('debe mostrar errores de validacion al enviar vacio', async () => {
    // 1. ARRANGE: Renderizar el formulario
    render(<Inscripcion />);

    // 2. ACT: Hacer clic en "Inscribirse" sin llenar nada
    fireEvent.click(screen.getByRole('button', { name: /inscribirse/i }));

    // 3. ASSERT: Verificar que aparecen los mensajes de error
    expect(await screen.findByText('El nombre es obligatorio')).toBeInTheDocument();
    expect(screen.getByText('El email es obligatorio')).toBeInTheDocument();
    expect(screen.getByText('El telefono es obligatorio')).toBeInTheDocument();
  });
});
