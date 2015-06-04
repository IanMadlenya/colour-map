var dataInfo = {
    mapType: "map",
    scale: "linear",
    colorLow: "rgb(150,150,150)",
    colorHigh: "rgb(128,0,0)",
    //shownMax: 0.17,
    invalidColor: "url(#hash)",
    colorstroke: "white",
    colorhash: "rgb(160,160,160)",
    interpolate: "Lab", // Possible: Hcl Rgb Hsl Lab
    regions: "World"
// or:
//    invalidColor: "rgb(196,196,196)"
} 
var data = [
    { "region_index": 1    , "value": 0.016564 },
    { "region_index": 2    , "value": 0.0046185 },
    { "region_index": 3    , "value": 0.047019 },
    { "region_index": 4    , "value": 0.0041808 },
    { "region_index": 5    , "value": 0.059166 },
    { "region_index": 6    , "value": 0.037907 },
    { "region_index": 7    , "value": 0.058135 },
    { "region_index": 8    , "value": 0.0077011 },
    { "region_index": 9    , "value": 0.051152 },
    { "region_index": 10    , "value": 0.06106 },
    { "region_index": 11    , "value": 0.060818 },
    { "region_index": 12    , "value": 0.028715 },
    { "region_index": 13    , "value": 0.10655 },
    { "region_index": 14    , "value": 0.054513 },
    { "region_index": 15    , "value": 0.042146 },
    { "region_index": 16    , "value": 0.051383 },
    { "region_index": 17    , "value": 0.02084 },
    { "region_index": 18    , "value": 0.071587 },
    { "region_index": 19    , "value": 0.042459 },
    { "region_index": 20    , "value": 0.0056266 },
    { "region_index": 21    , "value": 0.075716 },
    { "region_index": 22    , "value": 0.0071669 },
    { "region_index": 23    , "value": 0.029634 },
    { "region_index": 24    , "value": 0.045475 },
    { "region_index": 25    , "value": 0.00056683 },
    { "region_index": 26    , "value": 0.059733 },
    { "region_index": 27    , "value": 0.0021915 },
    { "region_index": 28    , "value": 0.0047574 },
    { "region_index": 29    , "value": 0.049811 },
    { "region_index": 30    , "value": 0.00017086 },
    { "region_index": 31    , "value": 0.00010046 },
    { "region_index": 32    , "value": 0.026491 },
    { "region_index": 33    , "value": 0.018001 },
    { "region_index": 34    , "value": 0.061782 },
    { "region_index": 35    , "value": 0.0034774 },
    { "region_index": 36    , "value": 0.055595 },
    { "region_index": 37    , "value": 0.0037631 },
    { "region_index": 38    , "value": 0.00064653 },
    { "region_index": 39    , "value": 0.059059 },
    { "region_index": 40    , "value": 0.055585 },
    { "region_index": 41    , "value": 0.057484 },
    { "region_index": 42    , "value": 0.015564 },
    { "region_index": 43    , "value": 0.048114 },
    { "region_index": 44    , "value": 0.059212 },
    { "region_index": 45    , "value": 0.035741 },
    { "region_index": 46    , "value": 0.05145 },
    { "region_index": 47    , "value": 0.056653 },
    { "region_index": 48    , "value": 0.017373 },
    { "region_index": 49    , "value": 0.0016684 },
    { "region_index": 50    , "value": 0.021479 },
    { "region_index": 51    , "value": 0.060694 },
    { "region_index": 52    , "value": 0.0046981 },
    { "region_index": 53    , "value": 0.039101 },
    { "region_index": 54    , "value": 0.051647 },
    { "region_index": 55    , "value": 0.058189 },
    { "region_index": 56    , "value": 0.041589 },
    { "region_index": 57    , "value": 0.0009187 },
    { "region_index": 58    , "value": 0.048001 },
    { "region_index": 59    , "value": 0.0093765 },
    { "region_index": 60    , "value": 0.0032632 },
    { "region_index": 61    , "value": 0.0565 },
    { "region_index": 62    , "value": 0.052348 },
    { "region_index": 63    , "value": 0.012604 },
    { "region_index": 64    , "value": 0.016408 },
    { "region_index": 65    , "value": 0 },
    { "region_index": 66    , "value": 0.033334 },
    { "region_index": 67    , "value": 0.056284 },
    { "region_index": 68    , "value": 0.056705 },
    { "region_index": 69    , "value": 0.061187 },
    { "region_index": 70    , "value": 0.020854 },
    { "region_index": 71    , "value": 0.041449 },
    { "region_index": 72    , "value": 0.0080818 },
    { "region_index": 73    , "value": 0.075497 },
    { "region_index": 74    , "value": 0.024876 },
    { "region_index": 75    , "value": 0.039482 },
    { "region_index": 76    , "value": 0.072259 },
    { "region_index": 77    , "value": 0.051198 },
    { "region_index": 78    , "value": 0.056385 },
    { "region_index": 79    , "value": 0.04551 },
    { "region_index": 80    , "value": 0.06656 },
    { "region_index": 81    , "value": 0.054104 },
    { "region_index": 82    , "value": 0.044667 },
    { "region_index": 83    , "value": 0.10498 },
    { "region_index": 84    , "value": 0.055007 },
    { "region_index": 85    , "value": 0.05531 },
    { "region_index": 86    , "value": 0.055906 },
    { "region_index": 87    , "value": 0.11205 },
    { "region_index": 88    , "value": 0.062524 },
    { "region_index": 89    , "value": 0.057284 },
    { "region_index": 90    , "value": 0.071185 },
    { "region_index": 91    , "value": 0.066844 },
    { "region_index": 92    , "value": 0.031061 },
    { "region_index": 93    , "value": 0.0078573 },
    { "region_index": 94    , "value": 0.041637 },
    { "region_index": 95    , "value": 0.061782 },
    { "region_index": 96    , "value": 0.016105 },
    { "region_index": 97    , "value": 0.00042739 },
    { "region_index": 98    , "value": 0.046423 },
    { "region_index": 99    , "value": 8.724e-005 },
    { "region_index": 100    , "value": 0.054852 },
    { "region_index": 101    , "value": 0.038153 },
    { "region_index": 102    , "value": 0.029845 },
    { "region_index": 103    , "value": 0.017337 },
    { "region_index": 104    , "value": 0.0024767 },
    { "region_index": 105    , "value": 0.10754 },
    { "region_index": 106    , "value": 0.0042808 },
    { "region_index": 107    , "value": 0.0045134 },
    { "region_index": 108    , "value": 0.050331 },
    { "region_index": 109    , "value": 0.0048401 },
    { "region_index": 110    , "value": 0.031347 },
    { "region_index": 111    , "value": 0.057944 },
    { "region_index": 112    , "value": 0.00013379 },
    { "region_index": 113    , "value": 0.0086034 },
    { "region_index": 114    , "value": 0.0028884 },
    { "region_index": 115    , "value": 0.046602 },
    { "region_index": 116    , "value": 0.00087081 },
    { "region_index": 117    , "value": 0 },
    { "region_index": 118    , "value": 0.0082379 },
    { "region_index": 119    , "value": 0.020094 },
    { "region_index": 120    , "value": 0.091625 },
    { "region_index": 121    , "value": 0.045944 },
    { "region_index": 122    , "value": 0.010405 },
    { "region_index": 123    , "value": 0.061706 },
    { "region_index": 124    , "value": 0.023414 },
    { "region_index": 125    , "value": 0.0017518 },
    { "region_index": 126    , "value": 0.063492 },
    { "region_index": 127    , "value": 0.054097 },
    { "region_index": 128    , "value": 0.028541 },
    { "region_index": 129    , "value": 0.067241 },
    { "region_index": 130    , "value": 0.069667 },
    { "region_index": 131    , "value": 0.054031 },
    { "region_index": 132    , "value": 0.0038645 },
    { "region_index": 133    , "value": 0.043202 },
    { "region_index": 134    , "value": 0.050689 },
    { "region_index": 135    , "value": 0.99999, "color": "rgb(0,0,0)" },
    { "region_index": 136    , "value": 0.059285 },
    { "region_index": 137    , "value": 0.061342 },
    { "region_index": 138    , "value": 0.076641 },
    { "region_index": 139    , "value": 0.06032 },
    { "region_index": 140    , "value": 0 },
    { "region_index": 141    , "value": 0.052752 },
    { "region_index": 142    , "value": 0.053333 },
    { "region_index": 143    , "value": 0.0052671 },
    { "region_index": 144    , "value": 0.0027692 },
    { "region_index": 145    , "value": 0 },
    { "region_index": 146    , "value": 0 },
    { "region_index": 147    , "value": 0.060149 },
    { "region_index": 148    , "value": 0.02197 },
    { "region_index": 149    , "value": 0.021638 },
    { "region_index": 150    , "value": 0.00041604 },
    { "region_index": 151    , "value": 0.00040886 },
    { "region_index": 152    , "value": 0.066712 },
    { "region_index": 153    , "value": 0.052105 },
    { "region_index": 154    , "value": 0.059944 },
    { "region_index": 155    , "value": 0 },
    { "region_index": 156    , "value": 0.064328 },
    { "region_index": 157    , "value": 0.16379 },
    { "region_index": 158    , "value": 0.026401 },
    { "region_index": 159    , "value": 0.04866 },
    { "region_index": 160    , "value": 0.0004257 },
    { "region_index": 161    , "value": 0.05679 },
    { "region_index": 162    , "value": 0.061409 },
    { "region_index": 163    , "value": 0.038116 },
    { "region_index": 164    , "value": 0.093634 },
    { "region_index": 165    , "value": 0.00039225 },
    { "region_index": 166    , "value": 0.089867 },
    { "region_index": 167    , "value": 0.033188 },
    { "region_index": 168    , "value": 0.0026188 },
    { "region_index": 169    , "value": 0.072095 },
    { "region_index": 170    , "value": 0.047307 },
    { "region_index": 171    , "value": 0.058216 },
    { "region_index": 172    , "value": 0.024633 },
    { "region_index": 173    , "value": 0.025476 },
    { "region_index": 174    , "value": 0.070828 },
    { "region_index": 175    , "value": 0.063148 },
    { "region_index": 176    , "value": 0.094422 },
    { "region_index": 177    , "value": 0.03725 },
    { "region_index": 178    , "value": 0.17223 },
    { "region_index": 179    , "value": 0.046052 },
    { "region_index": 180    , "value": 0.11593 },
    { "region_index": 181    , "value": 0.0081149 },
    { "region_index": 182    , "value": 0.063548 },
    { "region_index": 183    , "value": 0.06102 },
    { "region_index": 184    , "value": 0.033164 },
    { "region_index": 185    , "value": 0.002147 },
    { "region_index": 186    , "value": 0.0086061 }
]