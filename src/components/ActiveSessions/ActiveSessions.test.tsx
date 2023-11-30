import React from 'react';
import {render, screen} from '@testing-library/react';
import { ActiveSessions } from './ActiveSessions';

describe('ActiveSessions', () => {
  test('renders with initial session count of 0', () => {
    render(<ActiveSessions />);

    const sessionInfo = screen.getByText('Online: 0');
    expect(sessionInfo).toBeInTheDocument();

    const userIcon = screen.getByAltText('users');
    expect(userIcon).toBeInTheDocument();
  });
});
