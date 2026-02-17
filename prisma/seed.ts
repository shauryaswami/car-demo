import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ["query"],
});

async function main() {
    const email = "admin@luxurycars.com";
    const password = "password123";

    const existingAdmin = await prisma.admin.findUnique({
        where: { email },
    });

    if (!existingAdmin) {
        await prisma.admin.create({
            data: {
                email,
                password,
            },
        });
        console.log("Admin user created");
    } else {
        console.log("Admin user already exists");
    }

    // Clear existing cars
    await prisma.carImage.deleteMany({});
    await prisma.car.deleteMany({});
    console.log("Cleared existing inventory");

    // Indian market luxury cars with INR prices and km mileage
    const cars = [
        {
            brand: "Mercedes-Benz",
            model: "S-Class S 450",
            year: 2024,
            price: 17500000, // ₹1.75 Cr
            mileage: 2000,
            fuelType: "Petrol",
            transmission: "Automatic",
            color: "Obsidian Black",
            description: "The epitome of luxury and innovation. Flagship sedan with cutting-edge technology.",
            images: [
                "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2070",
                "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=2070"
            ],
            featured: true,
            sold: false,
        },
        {
            brand: "BMW",
            model: "7 Series 740Li",
            year: 2024,
            price: 16000000, // ₹1.6 Cr
            mileage: 1500,
            fuelType: "Petrol",
            transmission: "Automatic",
            color: "Mineral White",
            description: "Ultimate driving luxury. Executive sedan with unparalleled comfort and performance.",
            images: [
                "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=2070",
                "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=2070"
            ],
            featured: true,
            sold: false,
        },
        {
            brand: "Audi",
            model: "A8 L 55 TFSI",
            year: 2024,
            price: 15500000, // ₹1.55 Cr
            mileage: 1800,
            fuelType: "Petrol",
            transmission: "Automatic",
            color: "Mythos Black",
            description: "Progressive luxury redefined. Sophisticated technology meets timeless elegance.",
            images: [
                "https://images.unsplash.com/photo-1610768764270-790fbec18178?auto=format&fit=crop&q=80&w=2070",
                "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=2070"
            ],
            featured: true,
            sold: false,
        },
        {
            brand: "Range Rover",
            model: "Autobiography LWB",
            year: 2024,
            price: 28500000, // ₹2.85 Cr
            mileage: 1200,
            fuelType: "Diesel",
            transmission: "Automatic",
            color: "Santorini Black",
            description: "The pinnacle of luxury SUVs. Unmatched presence and capability.",
            images: [
                "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=2070",
                "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=2070"
            ],
            featured: true,
            sold: false,
        },
        {
            brand: "Porsche",
            model: "Cayenne Turbo",
            year: 2024,
            price: 22000000, // ₹2.2 Cr
            mileage: 2500,
            fuelType: "Petrol",
            transmission: "PDK",
            color: "Carrara White",
            description: "Sports car performance in an SUV. Legendary Porsche engineering.",
            images: [
                "https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?auto=format&fit=crop&q=80&w=2070",
                "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2070"
            ],
            featured: false,
            sold: false,
        },
        {
            brand: "Mercedes-Benz",
            model: "GLE 450 4MATIC",
            year: 2023,
            price: 12500000, // ₹1.25 Cr
            mileage: 8000,
            fuelType: "Petrol",
            transmission: "Automatic",
            color: "Iridium Silver",
            description: "Versatile luxury SUV. Perfect blend of comfort and capability.",
            images: [
                "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=2070",
                "https://images.unsplash.com/photo-1520031441872-265149a9e690?auto=format&fit=crop&q=80&w=1974"
            ],
            featured: false,
            sold: false,
        },
        {
            brand: "BMW",
            model: "X7 xDrive40i",
            year: 2024,
            price: 14000000, // ₹1.4 Cr
            mileage: 3000,
            fuelType: "Petrol",
            transmission: "Automatic",
            color: "Carbon Black",
            description: "The ultimate luxury SAV. Commanding presence with seven-seat versatility.",
            images: [
                "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=2070",
                "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=2070"
            ],
            featured: false,
            sold: false,
        },
        {
            brand: "Jaguar",
            model: "XJ L Portfolio",
            year: 2023,
            price: 13500000, // ₹1.35 Cr
            mileage: 5000,
            fuelType: "Diesel",
            transmission: "Automatic",
            color: "British Racing Green",
            description: "British luxury at its finest. Distinctive design with refined performance.",
            images: [
                "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=2070",
                "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=2070"
            ],
            featured: false,
            sold: false,
        },
        {
            brand: "Audi",
            model: "Q7 45 TDI",
            year: 2024,
            price: 10500000, // ₹1.05 Cr
            mileage: 4000,
            fuelType: "Diesel",
            transmission: "Automatic",
            color: "Glacier White",
            description: "Premium seven-seater SUV. Sophisticated technology and spacious luxury.",
            images: [
                "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=2070",
                "https://images.unsplash.com/photo-1610768764270-790fbec18178?auto=format&fit=crop&q=80&w=2070"
            ],
            featured: false,
            sold: false,
        },
        {
            brand: "Porsche",
            model: "911 Carrera S",
            year: 2024,
            price: 21000000, // ₹2.1 Cr
            mileage: 1000,
            fuelType: "Petrol",
            transmission: "PDK",
            color: "Guards Red",
            description: "Iconic sports car. Timeless design with exhilarating performance.",
            images: [
                "https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=2070",
                "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2070"
            ],
            featured: false,
            sold: false,
        },
        {
            brand: "Rolls-Royce",
            model: "Ghost Extended",
            year: 2024,
            price: 85000000, // ₹8.5 Cr
            mileage: 500,
            fuelType: "Petrol",
            transmission: "Automatic",
            color: "Arctic White",
            description: "Post-opulent luxury. The ultimate expression of automotive excellence.",
            images: [
                "https://images.unsplash.com/photo-1631295868223-6326585131f4?auto=format&fit=crop&q=80&w=2070",
                "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=2070"
            ],
            featured: false,
            sold: false,
        },
        {
            brand: "Bentley",
            model: "Flying Spur V8",
            year: 2024,
            price: 65000000, // ₹6.5 Cr
            mileage: 800,
            fuelType: "Petrol",
            transmission: "Automatic",
            color: "Beluga Black",
            description: "Handcrafted perfection. British luxury with sporting character.",
            images: [
                "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=2070",
                "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=2070"
            ],
            featured: false,
            sold: false,
        },
    ];

    for (const car of cars) {
        const { images, ...carData } = car;

        await prisma.car.create({
            data: {
                ...carData,
                images: {
                    create: images.map(url => ({ url }))
                }
            },
        });
    }
    console.log(`Seeded ${cars.length} cars with Indian market pricing and specifications`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
