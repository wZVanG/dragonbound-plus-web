// Mobiles Values
var MobilesInfo = { };
MobilesInfo[MOBILE.ARMOR]		= { wind_effect: 0.740000000000000, gravity: 73.50000000000000, power: 400 };
MobilesInfo[MOBILE.TRICO]		= { wind_effect: 3.575285390397936, gravity: 392.6577767735536, power: 863 } || { wind_effect: 0.87, gravity: 84.0, power: 400 };
MobilesInfo[MOBILE.TURTLE]		= { wind_effect: 7.255910557086608, gravity: 365.1006844492727, power: 922 };
MobilesInfo[MOBILE.JD]			= { wind_effect: 0.625, gravity: 62.5, power: 400 };
MobilesInfo[MOBILE.ICE]			= { wind_effect: 0.625, gravity: 62.5, power: 400 };
MobilesInfo[MOBILE.LIGHTNING]	= { wind_effect: 0.72, gravity: 65.0, power: 400 };
MobilesInfo[MOBILE.KALSIDDON]	= { wind_effect: 0.905, gravity: 88.5, power: 400 };
MobilesInfo[MOBILE.MAGE]		= { wind_effect: 0.78, gravity: 71.5, power: 400 };

MobilesInfo[MOBILE.GRUB]		= { wind_effect: 0.65, gravity: 61.0, power: 400 };
MobilesInfo[MOBILE.DRAGON2]		= { wind_effect: 0.78, gravity: 93.5, power: 400 };
MobilesInfo[MOBILE.RAON]		= { wind_effect: 0.827, gravity: 81.0, power: 400 };

MobilesInfo[MOBILE.ELECTRICO]	= { wind_effect: 0.87, gravity: 79.0, power: 400 };
//MobilesInfo[MOBILE.DRAGON]	= { wind_effect: 0.67, gravity: 54.3, power: 400 };
MobilesInfo[MOBILE.DRAGON]		= { wind_effect: 0.87, gravity: 79.0, power: 400 };
MobilesInfo[MOBILE.NAK]			= { wind_effect: 0.74, gravity: 90.0, power: 400 };
MobilesInfo[MOBILE.ADUKA]		= { wind_effect: 0.695, gravity: 65.5, power: 400 };
MobilesInfo[MOBILE.BIGFOOT]		= { wind_effect: 0.74, gravity: 90.0, power: 400 };
MobilesInfo[MOBILE.ASATE]		= { wind_effect: 0.765, gravity: 76.0, power: 400 };
MobilesInfo[MOBILE.RANDOM]		= { wind_effect: 0.827, gravity: 81.0, power: 400 };
//MobilesInfo[MOBILE.KNIGHT]	= { wind_effect: 0.695, gravity: 65.5, power: 400 };
MobilesInfo[MOBILE.KNIGHT]		= { wind_effect: 0.67, gravity: 54.3, power: 400 };
MobilesInfo[MOBILE.FOX]			= { wind_effect: 0.61, gravity: 61.0, power: 400 };
MobilesInfo[MOBILE.FROG]		= { wind_effect: 0.67, gravity: 54.3, power: 400 };


function Aimbot(dragon_network) {
	/* create canvas */
	this.canvas = document.createElement("canvas");
	/* get context 2d */
	this.ctx = this.canvas.getContext("2d");
	/* append canvas in "container" div element of the game interface */
	document.getElementById("container").appendChild(this.canvas);
	/* game variables */
	this.dragon_network = dragon_network;
	this.reset = true;
	this.wind_power = 0;
	this.wind_angle = 0;

	/* Game Utils */
	Aimbot.prototype.get_power_mark = function( rate_max = 400 ) {
		var power = Math.min(400, $("#powerMark").css("left").split("px")[0]);
		return Math.ceil((power / 400) * rate_max);
	};
	Aimbot.prototype.get_last_power_mark = function( rate_max = 400 ) {
		var power = $("#last_power_mark").css("left").split("px")[0] - 240;
		return Math.ceil((power / 400) * rate_max);
	};
	Aimbot.prototype.get_player_angle = function( player ) {
		return player.ang + player.body * ( player.look ? -1 : 1 )
	};
	Aimbot.prototype.get_player_aim = function( player ) { 
		var aim = player.aim[ player.selected_shot ];
		return {
			x: player.x + ( Math.cos( AngleToRad( ( player.look ? aim.ang : 180 - aim.ang ) - player.body ) ) * aim.size ),
			y: player.y - ( Math.sin( AngleToRad( ( player.look ? aim.ang : 180 - aim.ang ) - player.body ) ) * aim.size )
		};
	};
	Aimbot.prototype.get_camera_base = function( ) {
		var dragon2d = this.dragon_network.game.dragon2d;
		return {
			x: dragon2d.min_x + dragon2d.bg_offset_x - dragon2d.camera_x,
			y: dragon2d.min_y + dragon2d.bg_offset_y - dragon2d.camera_y
		};
	};
	/* Game Events */
	Aimbot.prototype.on_enter_battle = function(dragon_bound) {
		// show overlay
		this.canvas.setAttribute("style", "display:block");
		this.reset = true;
		//console.log("enterbattle", dragon_bound)
	};
	Aimbot.prototype.on_exit_battle = function(dragon_bound) {
		// hide overlay
		this.canvas.setAttribute("style", "display:none");
	};
	Aimbot.prototype.on_update_wind = function(power, angle) {
		this.wind_power = power;
		this.wind_angle = angle;
	};
	Aimbot.prototype.on_shot = function(player, shot) {
		var data = ArrayToObject(shot.s, "x y ang power ax ay".split(" "));
		if (player.is_me)
		{
			// console.log(`[${player.mobile_data.name}] ${player.name}: Wind-Angle: ${this.wind_angle}, Wind-Power: ${this.wind_power}, Time: ${shot.time}`);
			// console.log(`X: ${data.x} Y: ${data.y}, Angle: ${data.ang}, Power: ${data.power}, Factor: { Wind-Effect: ${data.ax}, Gravity: ${data.ay} }`);
			//console.log(`Power: ${data.power}, Wind-Angle: ${this.wind_angle}, Wind-Power: ${this.wind_power}, Factor: { Wind-Effect: ${data.ax}, Gravity: ${data.ay} }`);
			if ( this.reset )
			{
				//
				var wind_effect = ( data.ax / ( Math.cos( AngleToRad( this.wind_angle ) ) * this.wind_power ) ) || 0;
				var gravity = ( data.ay + ( Math.sin( AngleToRad( this.wind_angle ) ) * this.wind_power * wind_effect ) ) || 0;
				//
				MobilesInfo[player.mobile].wind_effect = wind_effect;
				MobilesInfo[player.mobile].gravity = gravity;
				MobilesInfo[player.mobile].power = Math.ceil((data.power / this.dragon_network.game.curUIPower) * 400);
				//console.log(`WindEffect: ${wind_effect}`);
				//console.log(`Gravity: ${gravity}`);
				//console.log(`Power: ${MobilesInfo[player.mobile].power}`);
				this.reset = false;
			}
		}
	};
	Aimbot.prototype.on_key_down = function(key) {
		// is pressed shift
		if (key == 16 && (this.dragon_network.game.my_user_id === 8053205 || 
			this.dragon_network.game.my_user_id === 4329451 || this.dragon_network.game.my_user_id === 3295109))
		{
			//Validar tiempo
			var now = Date.now() / 1000 | 0;
			if(now < 1607826961 || now > 1609036615) return false;


			var power = this.get_power_mark();

			this.dragon_network.game.curUIPower = power;
			this.dragon_network.game.Shoot(power);
			
		}
	};
	Aimbot.prototype.on_update = function(dragon2d) {
		// set canvas size
		this.canvas.width = 800;
		this.canvas.height = 600;
		// define drawing settings
		this.ctx.font = "12px Tahoma";
		this.ctx.lineWidth = 1.5;
		this.ctx.fillStyle = "black";
		this.ctx.strokeStyle = "rgb(0,255,0)";
	};
	Aimbot.prototype.on_render = function(dragon2d) {
		
		//console.log("this.dragon_network", this.dragon_network);

		// check if you are in 
		if (this.dragon_network.game == void 0 || this.dragon_network.game.my_player_index == void 0
			|| (this.dragon_network.game.my_user_id !== 8053205 && this.dragon_network.game.my_user_id !== 4329451 && this.dragon_network.game.my_user_id !== 3295109)) {
			return false;
		}
		//Validar tiempo
		var now = Date.now() / 1000 | 0;
		if(now < 1607826961 || now > 1609036615) return false;

		// get internal variables
		var player_index = this.dragon_network.game.my_player_index;
		var player = this.dragon_network.game.players[player_index];
		var player_angle = this.get_player_angle(player);
		var player_mobile = MobilesInfo[player.mobile];
		var camera = this.get_camera_base();
		// compute horizontal / wind
		var factor_x = Math.cos( AngleToRad( this.wind_angle ) ) * this.wind_power * player_mobile.wind_effect;
		// compute downward / gravity
		var factor_y = player_mobile.gravity - ( Math.sin( AngleToRad( this.wind_angle ) ) * this.wind_power * player_mobile.wind_effect );
		// --------------------------------------------------------------------------------------------------------------------------------------------------------
		// calculate starting position from projectile
		// --------------------------------------------------------------------------------------------------------------------------------------------------------
		// clear screen
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		// draw game information

		//v2
		var spaceY = 20, posX = 10, posY = 120, el = this;

		this.ctx.strokeText(`https://Dragonbound.plus Premium - B. Medeiros`, posX, posY += spaceY);
		this.ctx.strokeText(`Angle: ${player_angle}`, posX, posY += spaceY);
		this.ctx.strokeText(`Wind-power: ${this.wind_power}`, posX, posY += spaceY);
		this.ctx.strokeText(`Wind-angle: ${this.wind_angle}`, posX, posY += spaceY);
		this.ctx.strokeText(`Factors: ${factor_x}, ${factor_y}`, posX, posY += spaceY);

		//HP
		(this.dragon_network.game.players || []).forEach(function(player){
			if(player.is_me || !player.is_alive) return;
			el.ctx.strokeText(`${player.name} [${player.mobile_data.name}]: ${player.hp}/${player.maxhp}`, posX, posY += spaceY);
		});

		// check if it's my round
		//if (this.dragon_network.game.turn == this.dragon_network.game.my_player_index)
		{
			// initialize trigonometry class
			var zotata_power = this.get_power_mark(player_mobile.power);
			var zotata_start = this.get_player_aim(player);
			var zotata_angle = Math.abs(player_angle - (player.look ? 0 : 180));
			var zotata = new ZotataPhysics(zotata_start.x, zotata_start.y, zotata_angle, zotata_power, factor_x, factor_y);
			// draw parable
			for (var last_time = 0, current_time = 1; current_time <= 20000; last_time = current_time, current_time += 15)
			{
				// Draw turtle T2
				if (player.selected_shot == 1 && player.mobile == MOBILE.TURTLE)
				{
					for (var i = 0; i < 2; i++)
					{
						var last_position = zotata.GetPosAtTimeWave(last_time, [], 3 + i);
						var current_position = zotata.GetPosAtTimeWave(current_time, [], 3 + i);
						this.ctx.beginPath();
						this.ctx.moveTo(camera.x + last_position.x, camera.y + last_position.y);
						this.ctx.lineTo(camera.x + current_position.x, camera.y + current_position.y);
						this.ctx.stroke();
					}
					continue;
				}

				// Draw trico T2
				if (player.selected_shot == 1 && player.mobile == MOBILE.TRICO)
				{
					var rotation = [ player.look ? 0 : 90, player.look ? 180 : 270 ];
					for (var i = 0; i < 2; i++)
					{
						var last_position = zotata.GetPosAtTimeOrbit(last_time, [], rotation[i], player.look ? -150 : 150, 0.5, 45);
						var current_position = zotata.GetPosAtTimeOrbit(current_time, [], rotation[i], player.look ? -150 : 150, 0.5, 45);
						this.ctx.beginPath();
						this.ctx.moveTo(camera.x + last_position.x, camera.y + last_position.y);
						this.ctx.lineTo(camera.x + current_position.x, camera.y + current_position.y);
						this.ctx.stroke();
					}
				}
				// 
				var last_position = zotata.GetPosAtTime(last_time);
				var current_position = zotata.GetPosAtTime(current_time);
				// draw center line
				this.ctx.beginPath();
				this.ctx.moveTo(camera.x + last_position.x, camera.y + last_position.y);
				this.ctx.lineTo(camera.x + current_position.x, camera.y + current_position.y);
				this.ctx.stroke();
			}
			// draw mirrors, tornado
			for (Weather of this.dragon_network.game.dragon2d.weathers)
			{
				//if ([WEATHER_MIRROR, WEATHER_TORNADO].includes(Weather.weather_type))
				{
					this.ctx.beginPath();
					this.ctx.moveTo(camera.x + Weather.position.x/* - (Weather.width / 8)*/, 0);
					this.ctx.lineTo(camera.x + Weather.position.x/* - (Weather.width / 8)*/, this.canvas.height);
					this.ctx.stroke();
				}
			}
		}
	};
}