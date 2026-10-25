
Add-Type -AssemblyName System.Drawing
$dirs = @('REGENCY HALL', 'GOA VILLA', 'HAVELOCK ISLAND', 'MANAN GURUGRAM', 'ARORA RESIDENCE', '77 ARVIND GUPTA', 'VRINDAVAN 3D', 'SUITE ROOM')
foreach ($d in $dirs) {
    $src = Join-Path 'RENDERS' (Join-Path $d '1.jpg')
    $thumb = Join-Path 'RENDERS' (Join-Path $d 'thumb.jpg')
    if (Test-Path $src) {
        $bmp = [System.Drawing.Bitmap]::new($src)
        $ratio = 900.0 / $bmp.Width
        $w = 900
        $h = [int]($bmp.Height * $ratio)
        $dest = [System.Drawing.Bitmap]::new($w, $h)
        $g = [System.Drawing.Graphics]::FromImage($dest)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.DrawImage($bmp, 0, 0, $w, $h)
        
        $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]82)
        
        $dest.Save($thumb, $codec, $encoderParams)
        $g.Dispose()
        $dest.Dispose()
        $bmp.Dispose()
        $size = (Get-Item $thumb).Length / 1024
        Write-Host "Created $thumb ($([int]$size) KB)"
    }
}
