function add(a,b){return a+b;}
function abs(a){if(a<0)
return-a;return a;}
function sum(array){return array.reduce(add);}
function sort(x){return x.sort(function(a,b){return a-b;});}
function round(x,n){n=typeof n==="number"?n:0;return Math.round(x*Math.pow(10,n))/Math.pow(10,n);}
function min(x){let min=Infinity;x.map(function(xi){if(xi<min){min=xi;}});return min;}
function max(x){let max=-Infinity;x.map(function(xi){if(xi>max){max=xi;}});return max;}
function range(start,stop){let len=stop-start;let range=new Array(len);for(let idx=0;idx<len;idx++){range[idx]=start++;}
return range;}
function avg(x){return sum(x)/x.length;}
function deviation(x){let xBar=avg(x);return x.map(function(xi){return xi-xBar;});}
function variance(x,bias){bias=typeof bias==="boolean"?bias:false;return(sum(deviation(x).map(function(xi){return Math.pow(xi,2);}))/(x.length-(bias===false?1:0)));}
function standardDeviation(x,bias){bias=typeof bias==="boolean"?bias:false;return Math.sqrt(variance(x,bias));}
function standardize(x){let sd=standardDeviation(x);return deviation(x).map(function(xi){return xi/sd;});}
function rank(x){let ranks=x.slice();ranks=sort(ranks);return x.map(function(xi){let rank;let first=ranks.indexOf(xi);let last=ranks.lastIndexOf(xi);if(first===last){rank=first;}else{rank=(first+last)/2;}
return rank+1;});}
function pearson(x,y){x=standardize(x);y=standardize(y);return(sum(x.map(function(xi,i){return xi*y[i];}))/(x.length-1));}
function spearman(x,y){let xDeviation,yDeviation;x=rank(x);y=rank(y);xDeviation=deviation(x);yDeviation=deviation(y);return(sum(xDeviation.map(function(xi,i){return xi*yDeviation[i];}))/Math.sqrt(sum(xDeviation.map(function(xi){return Math.pow(xi,2);}))*sum(yDeviation.map(function(yi){return Math.pow(yi,2);}))));}
function euclideanDistance(x,y){return Math.sqrt(sum(x.map(function(xi,i){return Math.pow(xi-y[i],2);})));}
function manhattanDistance(x,y){return sum(x.map(function(xi,i){return Math.abs(xi-y[i]);}));}
function pairwiseDistance(x,distanceMetric){let pairwiseDistances,distance,i,j;pairwiseDistances=[];for(i=0;i<x.length;i++){pairwiseDistances[i]=[];for(j=0;j<=i;j++){if(i===j){pairwiseDistances[i][j]=0;}else{distance=distanceMetric(x[i],x[j]);pairwiseDistances[i][j]=distance;pairwiseDistances[j][i]=distance;}}}
return pairwiseDistances;}
function hierarchicalClustering(pairwiseDistances,linkage){let clusters,minDistance,clusterA,clusterB,distance,distanceA,distanceB,candidates,mergedCluster,i,j;clusters=[];for(i=0;i<pairwiseDistances.length;i++){clusters.push({label:i,key:i,index:i,size:1});}
while(true){if(clusters.length===1){delete clusters[0].index;delete clusters[0].key;break;}
minDistance=Infinity;for(i=0;i<clusters.length;i++){clusterA=clusters[i];for(j=0;j<clusters.length;j++){if(i!==j){clusterB=clusters[j];distance=pairwiseDistances[clusterA.key][clusterB.key];if(distance<minDistance){minDistance=distance;candidates=[clusterA,clusterB];}}}}
mergedCluster={children:candidates,key:candidates[0].key,distance:minDistance,size:candidates[0].size+candidates[1].size};clusters[candidates[0].index]=mergedCluster;clusters.splice(candidates[1].index,1);for(i=0;i<clusters.length;i++){if(clusters[i].key===candidates[0].key){distance=0;}else{distanceA=pairwiseDistances[candidates[0].key][clusters[i].key];distanceB=pairwiseDistances[candidates[1].key][clusters[i].key];switch(linkage){case "single":if(distanceA<distanceB){distance=distanceA;}else{distance=distanceB;}
break;case "complete":if(distanceA>distanceB){distance=distanceA;}else{distance=distanceB;}
break;case "upgma":distance=(distanceA*candidates[0].size+
distanceB*candidates[1].size)/(candidates[0].size+candidates[1].size);break;}}
pairwiseDistances[candidates[0].key][clusters[i].key]=distance;pairwiseDistances[clusters[i].key][candidates[0].key]=distance;}
for(i=0;i<pairwiseDistances.length;i++){pairwiseDistances[i].splice(candidates[1].key,1);}
pairwiseDistances.splice(candidates[1].key,1);for(i=candidates[1].key;i<clusters.length;i++){clusters[i].key--;}
delete candidates[0].key;delete candidates[0].index;delete candidates[1].key;delete candidates[1].index;for(i=0;i<clusters.length;i++){clusters[i].index=i;}}
return clusters;}