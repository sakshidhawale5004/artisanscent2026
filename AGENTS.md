<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

- Keep storefront interactions in React and catalogue data in a dedicated product module; commerce is a presentation prototype until payments and inventory are connected.
- Render the interactive abstract scent sculpture through a lazy client-only R3F module; this avoids WebGL during server rendering.
- Reuse the scent sculpture for the entrance loader; bound its media-readiness wait so slow or failed assets never block access to the store.
- Keep user-requested original videos in public/videos as a source-controlled exception to asset externalization; the user explicitly needs media in GitHub exports.
- Define visual styling in global semantic tokens and use shared Button variants for controls; this keeps the luxury presentation consistent.
