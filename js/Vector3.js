var Vector3 = (function () {
	
	function Vector3 (x, y, z) {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
	}
	
	//三角函数 弧度转角度
	var M = {
		sinD : function (angle) {
			return Math.sin (angle * (Math.PI / 180));
		},
		cosD : function (angle) {
			return Math.cos (angle * (Math.PI / 180));
		},	
		tanD : function (angle) {
			return Math.tan (angle * (Math.PI / 180));
		},
		asinD : function (ratio) {
			return Math.asin (ratio) * (180 / Math.PI);
		},
		acosD : function (ratio) {
			return Math.acos (ratio) * (180 / Math.PI);
		},
		atanD : function (ratio) {
			return Math.atan (ratio) * (180 / Math.PI);
		},
		atan2D : function (y,x) {
			return Math.atan2 (y, x) * (180 / Math.PI);
		}
		
	};
	
	
	Vector3.prototype = {
		
		constructor: Vector3,
		
		clone: function () {
			return new this.constructor( this.x, this.y, this.z );
		},
		
		copy: function ( v ) {
			this.x = v.x;
			this.y = v.y;
			this.z = v.z;
			return this;
		},
		
		set: function ( x, y, z ) {
			this.x = x;
			this.y = y;
			this.z = z;
			return this;
		},
		
		setX: function ( x ) {
			this.x = x;
			return this;
		},
	
		setY: function ( y ) {
			this.y = y;
			return this;
		},
	
		setZ: function ( z ) {
			this.z = z;
			return this;
		},
		//A+=a
		addScalar: function ( s ) {
	
			this.x += s;
			this.y += s;
			this.z += s;
	
			return this;
	
		},
		//A+=B
		add: function ( v ) {

			this.x += v.x;
			this.y += v.y;
			this.z += v.z;
	
			return this;
	
		},
		//A = B+C
		addVectors: function ( a, b ) {
	
			this.x = a.x + b.x;
			this.y = a.y + b.y;
			this.z = a.z + b.z;
	
			return this;
	
		},
		//A-=a
		subScalar: function ( s ) {
			this.x -= s;
			this.y -= s;
			this.z -= s;
			return this;
		},
		//A-=B
		sub: function ( v ) {
			this.x -= v.x;
			this.y -= v.y;
			this.z -= v.z;
			return this;
		},
		//A = B-C
		subVectors: function ( a, b ) {
			this.x = a.x - b.x;
			this.y = a.y - b.y;
			this.z = a.z - b.z;
			return this;
		},
		//A *= B
		multiply: function ( v ) {
			this.x *= v.x;
			this.y *= v.y;
			this.z *= v.z;
			return this;
		},
	    //A *= a
		multiplyScalar: function ( scalar ) {
			if ( isFinite( scalar ) ) {
				this.x *= scalar;
				this.y *= scalar;
				this.z *= scalar;
			} else {
				this.x = 0;
				this.y = 0;
				this.z = 0;
			}
			return this;
		},
		//A = B*C
		multiplyVectors: function ( a, b ) {
			this.x = a.x * b.x;
			this.y = a.y * b.y;
			this.z = a.z * b.z;
			return this;
		},
		
		//A /= B
		divide: function ( v ) {
			this.x /= v.x;
			this.y /= v.y;
			this.z /= v.z;
			return this;
		},
		//A /= a
		divideScalar: function ( scalar ) {
			return this.multiplyScalar( 1 / scalar );
		},
		
		//Get vector length 求向量的模
		getLength: function () {
			return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
		},
		// Set vector length
		setLength: function ( length ) {
			return this.multiplyScalar( length / this.getLength() );
		},
		
		floor: function () {
			this.x = Math.floor( this.x );
			this.y = Math.floor( this.y );
			this.z = Math.floor( this.z );
			return this;
		},
	
		ceil: function () {
			this.x = Math.ceil( this.x );
			this.y = Math.ceil( this.y );
			this.z = Math.ceil( this.z );
			return this;
		},
	
		round: function () {
			this.x = Math.round( this.x );
			this.y = Math.round( this.y );
			this.z = Math.round( this.z );
			return this;
		},
		
		//长度的平方
		lengthSq: function () {
			return this.x * this.x + this.y * this.y + this.z * this.z;
		},
		
		//点乘
		dot : function (v) {
			return this.x * v.x + this.y * v.y + this.z * v.z;
		},
		
		//叉乘
		cross : function (v) {
			var x = this.x, y = this.y, z = this.z;
			this.x = y * v.z - z * v.y;
			this.y = z * v.x - x * v.z;
			this.z = x * v.y - y * v.x;
			return this;
		},
		
		//缩放向量 等同于 multiplyScalar
		scale : function (sc) {
			this.multiplyScalar(sc);
		},
		//单位化向量 向量除以他的模 
		normalize: function () {
			return this.divideScalar( this.getLength() );
		},
		
		rotateX : function (ang) {
			var ca = M.cosD (ang);
			var sa = M.sinD (ang);				
			this.rotateXTrig(ca, sa);
		},
		rotateXTrig : function (ca,sa) {
			var ry = this.y * ca - this.z * sa;
			var rz = this.y * sa + this.z * ca;
			this.y = ry;
			this.z = rz;
		},
		rotateY : function (ang) {
			var ca = M.cosD (ang);
			var sa = M.sinD (ang);
			this.rotateYTrig(ca, sa);
		},
		rotateYTrig : function (ca,sa) {
			var rx = this.x * ca + this.z * sa;
			var rz = this.x * -sa + this.z * ca;
			this.x = rx;
			this.z = rz;
		},
		rotateZ : function (ang) {
			var ca = M.cosD (ang);
			var sa = M.sinD (ang);				
			this.rotateZTrig(ca, sa);
		},
		rotateZTrig : function (ca,sa) {
			var rx = this.x * ca - this.y * sa;
			var ry = this.x * sa + this.y * ca;
			this.x = rx;
			this.y = ry;
		},
		rotateXY : function (a,b) {
			var ca = M.cosD (a);
			var sa = M.sinD (a);
			var cb = M.cosD (b);
			var sb = M.sinD (b);
			this.rotateXYTrig(ca, sa, cb, sb);
		},
		rotateXYTrig : function (ca, sa, cb, sb) {
			// x-axis rotation
			var rz = this.y * sa + this.z * ca;
			this.y = this.y * ca - this.z * sa;
			// y-axis rotation
			this.z = this.x * -sb + rz * cb;
			this.x = this.x * cb + rz * sb;
		},
		rotateXYZ : function (a,b,c) {
			var ca = M.cosD (a);
			var sa = M.sinD (a);
			var cb = M.cosD (b);
			var sb = M.sinD (b);
			var cc = M.cosD (c);
			var sc = M.sinD (c);
			this.rotateXYZTrig(ca, sa, cb, sb, cc, sc);
		},
		rotateXYZTrig : function (ca, sa, cb, sb,cc,sc) {
			// x-axis rotation
			var ry = this.y * ca - this.z * sa;
			var rz = this.y * sa + this.z * ca;
			// y-axis rotation
			var rx = this.x * cb + rz * sb;
			
			this.z = this.x * -sb + rz * cb;
			// z-axis rotation
			this.x = rx * cc - ry * sc;
			this.y = rx * sc + ry * cc;
		},
		
		getAngleX : function () {
			return M.atan2D(this.z, this.y);
		},
		setAngleX : function (ang) {
			var r = Math.sqrt (this.y*this.y + this.z*this.z);
			this.y = r * M.cosD (ang);
			this.z = r * M.sinD (ang);
		},
		
		getAngleY : function () {
			return M.atan2D (this.z, this.x);
		},
		setAngleY : function (ang) {
			var r = Math.sqrt (this.x*this.x + this.z*this.z);
			this.x = r * M.cosD (ang);
			this.z = r * M.sinD (ang);
		},
		
		getAngleZ : function () {
			return M.atan2D (this.y, this.x);
		},
		setAngleZ : function (ang) {
			var r = Math.sqrt (this.y*this.y + this.x*this.x);
			this.y = r * M.cosD (ang);
			this.x = r * M.sinD (ang);
		},
		//求2个向量之间的距离  等同于(A-B).getLength() 
		distanceTo : function  (a) {
			return Math.sqrt ( Math.pow( this.x-a.x, 2 ) + Math.pow( this.y-a.y, 2 ) + Math.pow( this.z-a.z, 2 ));
		},
		
		//求2个向量之间的夹角  返回弧度
		angleTo: function ( v ) {
			var theta = this.dot( v ) / ( Math.sqrt( this.lengthSq() * v.lengthSq() ) );
			var clamp = Math.max( -1, Math.min( 1, theta ) )
			return M.acosD( clamp );
		},
		
		
		
		getPerspective : function (perspective) {
			var scale = perspective / (this.z + perspective);
			return scale;
		},
		persProject : function (scale) {
			this.x *= scale;
			this.y *= scale;
			this.z = 0;
		},
		persProjectNew : function (scale) {
			return {
				x: scale*this.x,
				y: scale*this.y
			};
		},
		
		
		
	};
	return Vector3;
})();
