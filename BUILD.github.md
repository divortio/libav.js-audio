# GitHub Actions Structural Pipeline

`libav.js-audio` represents the root dependency cascading workflow for the entire organizational group mapping inside our namespace.

## Webhook Root Dispatcher (`repository_dispatch`)
Since standard workflows only operate across branches structurally scoped into single repository bindings, `libav.js-audio` forces its compiled binaries to propagate cross-network!

When a tag containing `v*` is completely packaged, it triggers `softprops/action-gh-release@v2`.

Immediately after the GitHub release concludes, the pipeline sends a strict dispatch payload:
```yaml
uses: peter-evans/repository-dispatch@v3
with:
  token: ${{ secrets.PAT }}
  repository: divortio/audio-decode-libav
  event-type: upstream-libav-updated
```

This guarantees `audio-decode-libav` will recursively intercept the webhook ping, and dynamically download the newly zipped Engine archives triggering its own pipeline re-compilation sequences recursively notifying `neiro-libav` internally automatically!
