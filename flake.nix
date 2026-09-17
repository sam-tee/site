{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05";

  outputs = { self, nixpkgs }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "aarch64-darwin" ];
      forEachSystem = f: nixpkgs.lib.genAttrs systems (system:
        let pkgs = import nixpkgs { inherit system; }; in f pkgs);
    in {
      devShells = forEachSystem (pkgs: {
        default = pkgs.mkShell {
          packages = with pkgs; [
            zola
            resvg
            (texlive.combine { inherit (texlive) scheme-small titlesec enumitem parskip; })
          ];
          # NOTE: wrangler deliberately NOT pinned here — its closure is huge
          # and slow to fetch on small machines. For Cloudflare deploys, use
          # `npm i -g wrangler` on a machine with Node, or dashboard upload.
        };
      });
    };
}
