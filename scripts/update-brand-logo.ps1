param(
  [Parameter(Mandatory = $true)]
  [string]$SourcePath,

  [string]$RootPath = ""
)

$scriptRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
if (-not $RootPath) {
  $RootPath = (Resolve-Path (Join-Path $scriptRoot "..")).Path
}

Add-Type -AssemblyName System.Drawing

$csharp = @"
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;

public static class BrandLogoGenerator
{
    private static int Clamp(int value, int min, int max)
    {
        if (value < min) return min;
        if (value > max) return max;
        return value;
    }

    private static Bitmap ExtractSymbol(string sourcePath)
    {
        using (var source = new Bitmap(sourcePath))
        {
            var symbol = new Bitmap(source.Width, source.Height, PixelFormat.Format32bppArgb);
            var bounds = new Rectangle(source.Width, source.Height, 0, 0);

            for (int y = 0; y < source.Height; y++)
            {
                for (int x = 0; x < source.Width; x++)
                {
                    Color pixel = source.GetPixel(x, y);
                    float hue = pixel.GetHue();
                    float saturation = pixel.GetSaturation();
                    float brightness = pixel.GetBrightness();
                    bool blueLogoPixel = hue >= 175f && hue <= 235f && saturation > 0.12f && brightness > 0.14f;

                    if (!blueLogoPixel)
                    {
                        symbol.SetPixel(x, y, Color.Transparent);
                        continue;
                    }

                    int alpha = Clamp((int)Math.Round((saturation - 0.10f) / 0.55f * 255f), 0, 255);
                    if (alpha < 12)
                    {
                        symbol.SetPixel(x, y, Color.Transparent);
                        continue;
                    }

                    symbol.SetPixel(x, y, Color.FromArgb(alpha, pixel.R, pixel.G, pixel.B));
                    if (alpha > 24)
                    {
                        if (x < bounds.X) bounds.X = x;
                        if (y < bounds.Y) bounds.Y = y;
                        if (x > bounds.Width) bounds.Width = x;
                        if (y > bounds.Height) bounds.Height = y;
                    }
                }
            }

            if (bounds.Width <= bounds.X || bounds.Height <= bounds.Y)
            {
                return new Bitmap(source);
            }

            int padding = (int)Math.Round(Math.Max(bounds.Width - bounds.X, bounds.Height - bounds.Y) * 0.08);
            int left = Clamp(bounds.X - padding, 0, source.Width - 1);
            int top = Clamp(bounds.Y - padding, 0, source.Height - 1);
            int right = Clamp(bounds.Width + padding, 0, source.Width - 1);
            int bottom = Clamp(bounds.Height + padding, 0, source.Height - 1);
            var crop = new Rectangle(left, top, Math.Max(1, right - left + 1), Math.Max(1, bottom - top + 1));
            return symbol.Clone(crop, PixelFormat.Format32bppArgb);
        }
    }

    private static void SaveContained(Bitmap symbol, string outputPath, int width, int height, float fill)
    {
        Directory.CreateDirectory(Path.GetDirectoryName(outputPath));
        using (var canvas = new Bitmap(width, height, PixelFormat.Format32bppArgb))
        using (var g = Graphics.FromImage(canvas))
        {
            g.Clear(Color.Transparent);
            g.CompositingMode = CompositingMode.SourceOver;
            g.CompositingQuality = CompositingQuality.HighQuality;
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
            g.PixelOffsetMode = PixelOffsetMode.HighQuality;
            g.SmoothingMode = SmoothingMode.AntiAlias;

            float maxWidth = width * fill;
            float maxHeight = height * fill;
            float scale = Math.Min(maxWidth / symbol.Width, maxHeight / symbol.Height);
            int drawWidth = Math.Max(1, (int)Math.Round(symbol.Width * scale));
            int drawHeight = Math.Max(1, (int)Math.Round(symbol.Height * scale));
            int x = (width - drawWidth) / 2;
            int y = (height - drawHeight) / 2;
            g.DrawImage(symbol, new Rectangle(x, y, drawWidth, drawHeight));
            canvas.Save(outputPath, ImageFormat.Png);
        }
    }

    public static void Generate(string sourcePath, string rootPath)
    {
        using (var symbol = ExtractSymbol(sourcePath))
        {
            SaveContained(symbol, Path.Combine(rootPath, "public", "brand", "logo-icon.png"), 500, 500, 0.86f);
            SaveContained(symbol, Path.Combine(rootPath, "src", "app", "icon.png"), 500, 500, 0.86f);
            SaveContained(symbol, Path.Combine(rootPath, "src", "app", "apple-icon.png"), 500, 500, 0.86f);
            SaveContained(symbol, Path.Combine(rootPath, "public", "brand", "logo-navbar.png"), 1536, 1024, 0.68f);
            SaveContained(symbol, Path.Combine(rootPath, "public", "brand", "logo-th.png"), 2172, 724, 0.66f);
            SaveContained(symbol, Path.Combine(rootPath, "public", "brand", "logo-en.png"), 2172, 724, 0.66f);
        }
    }
}
"@

Add-Type -TypeDefinition $csharp -ReferencedAssemblies System.Drawing
[BrandLogoGenerator]::Generate($SourcePath, $RootPath)
