// components/Navbar.js
import Link from "next/link";

const Navbar = () => {
  const navItems = [
    { name: "Home", url: "/" },
    { name: "Men's Clothing", url: "/category/men's-clothing" },
    { name: "Women's Clothing", url: "/category/women's-clothing" },
    { name: "Jewelry", url: "/category/jewelery" },
    { name: "Electronics", url: "/category/electronics" },
  ];

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">Product Store</h1>
        <div className="text-white flex gap-5 text-xl">
          {navItems.map((item) => (
            <div key={item.name}>
              <Link href={item.url}>{item.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
