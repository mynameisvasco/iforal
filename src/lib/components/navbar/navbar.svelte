<script>
	import NavbarItem from './navbar-item.svelte';
	import NavbarUserMenu from './navbar-user-menu.svelte';
	import { Icon, Menu, X } from 'svelte-hero-icons';
	import NavbarItemMobile from './navbar-item-mobile.svelte';
	import NavbarUserMenuMobile from './navbar-user-menu-mobile.svelte';
	import { slide } from 'svelte/transition';

	let isMobileMenuToggled = false;

	function handleMobileMenuToggled() {
		isMobileMenuToggled = !isMobileMenuToggled;
	}
</script>

<nav class="bg-white dark:bg-stone-800 shadow-sm">
	<div class="px-4 xl:px-20 2xl:px-32">
		<div class="flex justify-between h-16">
			<div class="flex">
				<div class="flex-shrink-0 flex items-center dark:text-white">iForal</div>
				<div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
					<NavbarItem path="/documents">Documentos</NavbarItem>
				</div>
			</div>
			<div class="hidden sm:ml-6 sm:flex sm:items-center">
				<div class="ml-3 relative">
					<NavbarUserMenu />
				</div>
			</div>
			<div class="-mr-2 flex items-center sm:hidden">
				<button
					on:click={handleMobileMenuToggled}
					type="button"
					class="inline-flex items-center justify-center p-2 rounded-md 
					text-stone-900 dark:text-white hover:bg-stone-100 dark:hover:bg-stone-700"
				>
					{#if isMobileMenuToggled}
						<Icon src={X} class="h-6 w-6" />
					{:else}
						<Icon src={Menu} class="block h-6 w-6" />
					{/if}
				</button>
			</div>
		</div>
		{#if isMobileMenuToggled}
			<div class="sm:hidden" transition:slide>
				<div class="pt-2 pb-3 space-y-1">
					<NavbarItemMobile path="/">Documentos</NavbarItemMobile>
				</div>
				<div class="pt-4 pb-3 border-t border-stone-200">
					<NavbarUserMenuMobile />
				</div>
			</div>
		{/if}
	</div>
</nav>
