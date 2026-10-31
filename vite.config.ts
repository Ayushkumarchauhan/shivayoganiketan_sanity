import { defineConfig, type Plugin } from 'vite'
import path from 'path'
import { existsSync } from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// ─── figma:asset/ resolver ────────────────────────────────────────────────────
//
// Inside Figma Make, `figma:asset/<hash>.png` is handled by a proprietary Vite
// plugin that is NOT included in exported code.  When you export and run the
// project locally, Vite would throw "Failed to resolve import 'figma:asset/…'"
// for every image.
//
// This plugin intercepts those virtual-module IDs and maps them to real files
// that the Figma Make export places in  src/assets/<hash>.png  —  so no
// component file needs to change at all.
//
// If a file is NOT found in src/assets/ (e.g. you are still inside Figma Make
// itself), the plugin returns null and lets the platform's own resolver handle
// it as usual.
// ─────────────────────────────────────────────────────────────────────────────
function figmaAssetPlugin(): Plugin {
  const PREFIX = 'figma:asset/'

  // Figma Make's export can place the image binaries in EITHER of these
  // locations depending on how/when the project was exported:
  //   • <root>/assets/<hash>.png       ← what the platform's own plugin uses
  //   • <root>/src/assets/<hash>.png   ← the layout this config assumed
  // We check both so images resolve no matter where the export dropped them.
  const CANDIDATE_DIRS = [
    path.resolve(__dirname, 'assets'),
    path.resolve(__dirname, 'src', 'assets'),
  ]

  return {
    name: 'figma-asset-resolver',

    // Called by Vite for every import id before normal resolution.
    resolveId(id: string) {
      if (!id.startsWith(PREFIX)) return null          // not our concern
      const filename = id.slice(PREFIX.length)         // e.g. "abc123.png"

      // If the binary actually exists on disk, resolve straight to it.
      for (const dir of CANDIDATE_DIRS) {
        const candidate = path.join(dir, filename)
        if (existsSync(candidate)) return candidate
      }

      // Not on disk. Inside Figma Make itself the platform's own resolver
      // (which runs first) will have already handled it, so returning null
      // here is safe. When running an export locally, this means the file is
      // genuinely missing — drop it into  assets/<hash>.png  to fix it.
      return null
    },
  }
}

export default defineConfig({
  plugins: [
    // ── figma:asset/ must come FIRST so it runs before the React transform ──
    figmaAssetPlugin(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  build: {
    // Slightly increase the chunk-size warning threshold (assets like
    // Figma PNG bundles can be large)
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Split vendor libraries into their own cacheable chunk so that
        // app code changes don't invalidate the React/router bundle.
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router'],
        },
      },
    },
  },
})
