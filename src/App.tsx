import { BrandSelector } from './components/BrandSelector';
import { TldSelector } from './components/TldSelector';
import { CookieList } from './components/CookieList';
import { DestinationInput } from './components/DestinationInput';
import { GeneratedUrl } from './components/GeneratedUrl';
import { PresetManager } from './components/PresetManager';
import { UrlHistory } from './components/UrlHistory';
import { useUrlGenerator } from './hooks/useUrlGenerator';
import { useStorage } from './hooks/useStorage';

function App() {
  const {
    brand,
    setBrand,
    tld,
    setTld,
    cookies,
    addCookie,
    removeCookie,
    updateCookie,
    destination,
    setDestination,
    generatedUrl,
    error,
    generateUrl,
    loadPreset,
    getCurrentConfig,
  } = useUrlGenerator();

  const { presets, history, savePreset, deletePreset, saveToHistory, clearHistory } =
    useStorage();

  const handleGenerate = () => {
    const url = generateUrl();
    if (url) {
      saveToHistory({
        url,
        timestamp: Date.now(),
        brand,
        tld,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Cookie Tool</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Configuration */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Configuration</h2>

            <BrandSelector value={brand} onChange={setBrand} />
            <TldSelector value={tld} onChange={setTld} />
            <CookieList
              cookies={cookies}
              onAdd={addCookie}
              onRemove={removeCookie}
              onUpdate={updateCookie}
            />
            <DestinationInput value={destination} onChange={setDestination} />

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Generate URL
            </button>
          </div>

          {/* Right Column: Results and Management */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Generated URL</h2>
              <GeneratedUrl url={generatedUrl} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <PresetManager
                presets={presets}
                onSave={savePreset}
                onLoad={loadPreset}
                onDelete={deletePreset}
                getCurrentConfig={getCurrentConfig}
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <UrlHistory history={history} onClear={clearHistory} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
