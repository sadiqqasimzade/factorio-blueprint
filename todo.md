
# TODO
- [ ] Convert video to blueprint
- [ ] Convert audio to blueprint
- [ ] Change images in cards
- [ ] Add batter Json visualizer to blueprint decoder
- [ ] Pixel art page updatePixel slows app
- [ ] Add pre-push git exe


# Known bugs
- [ ] When converting images with a height of more than 20 pixels, the calculateColorsForLamps function returns 2 arrays of the same length, i.e.
an image with a height of 21 is given, but 2 color arrays with a length of 11 are returned, as a result of this, the 2nd row from start uses colors of 1st row and 2nd row from end uses 1st row's colors from end.The entire code must be rewritten...