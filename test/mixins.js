// *************************************
//  Center
//  Center horizontal, vertical, or both
//  Uses absolute positioning
// *************************************

export function center (orientation = 'horizontal') {
  return center[orientation]
}

center.horizontal = ['ps:a', 'transform: translate(-50%, 0)', 'left:50%']

center.vertical = ['ps:a', 'transform: translate(0, -50%)', 'top:50%']

center.both = ['ps:a', 'transform: translate(-50%, -50%)', 'top:50%', 'left:50%']
