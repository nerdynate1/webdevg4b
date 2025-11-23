import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {ShoppingCart} from "lucide-react"; // Or your chosen icon

const CartButton = ({itemCount}: { itemCount: number }) => {
    return (
        <Button variant="outline" className="relative">
            <ShoppingCart className="h-5 w-5"/>
            <span className="sr-only">Shopping Cart</span> {/* For accessibility */}
            {itemCount > 0 && (
                <Badge
                    variant="default" // Or a suitable color
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full text-xs"
                >
                    {itemCount}
                </Badge>
            )}
        </Button>
    );
};

export default CartButton;