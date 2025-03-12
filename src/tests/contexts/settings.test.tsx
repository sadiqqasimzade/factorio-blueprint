import { TileNames } from '@/src/consts/enums';
import SettingProvider from '@/src/contexts/settings/settingProvider';
import SettingsContext from '@/src/contexts/settings/settingsContext';
import { fireEvent, render, screen } from '@testing-library/react';
import { useContext } from 'react';

// Test component that uses the settings context
const TestComponent = () => {
  const {
    lampBgTile,
    setLampBgTile,
    quality,
    setQuality,
    convertTo,
    setConvertTo
  } = useContext(SettingsContext);

  return (
    <div>
      <div data-testid="lampBgTile">{lampBgTile || 'null'}</div>
      <button onClick={() => setLampBgTile(TileNames.CONCRETE)}>Set Concrete</button>
      <button onClick={() => setLampBgTile(null)}>Clear Tile</button>
      
      <div data-testid="quality">{quality}</div>
      <button onClick={() => setQuality(5)}>Set Quality 5</button>
      
      <div data-testid="convertTo">{convertTo}</div>
      <button onClick={() => setConvertTo('platform')}>Set Platform</button>
    </div>
  );
};

describe('Settings Context and Provider', () => {
  const renderWithProvider = () => {
    return render(
      <SettingProvider>
        <TestComponent />
      </SettingProvider>
    );
  };

  it('provides default values', () => {
    renderWithProvider();
    
    expect(screen.getByTestId('lampBgTile')).toHaveTextContent('null');
    expect(screen.getByTestId('quality')).toHaveTextContent('1');
    expect(screen.getByTestId('convertTo')).toHaveTextContent('lamp');
  });

  it('updates lampBgTile value', () => {
    renderWithProvider();
    
    fireEvent.click(screen.getByText('Set Concrete'));
    expect(screen.getByTestId('lampBgTile')).toHaveTextContent(TileNames.CONCRETE);
    
    fireEvent.click(screen.getByText('Clear Tile'));
    expect(screen.getByTestId('lampBgTile')).toHaveTextContent('null');
  });

  it('updates quality value', () => {
    renderWithProvider();
    
    fireEvent.click(screen.getByText('Set Quality 5'));
    expect(screen.getByTestId('quality')).toHaveTextContent('5');
  });

  it('updates convertTo value', () => {
    renderWithProvider();
    
    fireEvent.click(screen.getByText('Set Platform'));
    expect(screen.getByTestId('convertTo')).toHaveTextContent('platform');
  });

  it('maintains state between renders', () => {
    const { rerender } = renderWithProvider();
    
    fireEvent.click(screen.getByText('Set Concrete'));
    fireEvent.click(screen.getByText('Set Quality 5'));
    fireEvent.click(screen.getByText('Set Platform'));
    
    rerender(
      <SettingProvider>
        <TestComponent />
      </SettingProvider>
    );
    
    expect(screen.getByTestId('lampBgTile')).toHaveTextContent(TileNames.CONCRETE);
    expect(screen.getByTestId('quality')).toHaveTextContent('5');
    expect(screen.getByTestId('convertTo')).toHaveTextContent('platform');
  });
}); 