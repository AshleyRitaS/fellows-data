// JavaScript program to implement Quick Hull algorithm
// to find convex hull.
 
// Stores the result (points of convex hull)
let hull = [];
 
// Returns the side of point p with respect to line
// joining points p1 and p2.
function findSide(p1, p2, p)
{
    let val = (p.y - p1.y) * (p2.x - p1.x) -
            (p2.y - p1.y) * (p.x - p1.x);
 
    if (val > 0)
        return 1;
    if (val < 0)
        return -1;
    return 0;
}
 
// returns a value proportional to the distance
// between the point p and the line joining the
// points p1 and p2
function lineDist(p1, p2, p)
{
    return Math.abs ((p.y - p1.y) * (p2.x - p1.x) -
            (p2.y - p1.y) * (p.x - p1.x));
}
 
// End points of line L are p1 and p2. side can have value
// 1 or -1 specifying each of the parts made by the line L
function quickHull(a, n, p1, p2, side)
{
    let ind = -1;
    let max_dist = 0;
 
    // finding the point with maximum distance
    // from L and also on the specified side of L.
    for (let i=0; i<n; i++)
    {
        let temp = lineDist(p1, p2, a[i]);
        if ((findSide(p1, p2, a[i]) == side) && (temp > max_dist))
        {
            ind = i;
            max_dist = temp;
        }
    }
 
    // If no point is found, add the end points
    // of L to the convex hull.
    if (ind == -1)
    {
        hull.push([p1, p2])
        return;
    }
 
    // Recur for the two parts divided by a[ind]
    quickHull(a, n, a[ind], p1, -findSide(a[ind], p1, p2));
    quickHull(a, n, a[ind], p2, -findSide(a[ind], p2, p1));
}
 
export default function findHull(a)
{
    hull = [];
    var n = a.length;
    // a[i].second -> y-coordinate of the ith point
    if (n < 3)
    {
        return a;
    }
 
    // Finding the point with minimum and
    // maximum x-coordinate
    let min_x = 0, max_x = 0;
    for (let i=1; i<n; i++)
    {
        if (a[i].x < a[min_x].x)
            min_x = i;
        if (a[i].x > a[max_x].x)
            max_x = i;
    }
 
    // Recursively find convex hull points on
    // one side of line joining a[min_x] and
    // a[max_x]
    quickHull(a, n, a[min_x], a[max_x], 1);
 
    // Recursively find convex hull points on
    // other side of line joining a[min_x] and
    // a[max_x]
    quickHull(a, n, a[min_x], a[max_x], -1);

    return hull;
}