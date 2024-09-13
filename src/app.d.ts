import type { Session } from "$lib/client/auth-client-interface";
import type { User } from "$lib/model/user.model";
import type { ServerRequestSession } from "$lib/server/auth-server-interface";
import type { UserService } from "$lib/server/service/user.service";


// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
