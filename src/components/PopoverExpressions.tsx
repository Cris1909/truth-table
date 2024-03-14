"use client";

import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { FaInfo } from "react-icons/fa";

export const PopoverExpressions = () => {
  return (
    <Popover showArrow placement="right-start">
      <PopoverTrigger>
        <Button
          isIconOnly
          color="primary"
          variant="shadow"
          className="rounded-full"
          size="sm"
        >
          <FaInfo />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-md flex font-semibold gap-2">
            <ul className="text-secondary">
              <li>{"∧ => Conjunción:"}</li>
              <li>{"∨ => Disyunción:"}</li>
              <li>{"¬ => Negación:"}</li>
            </ul>

            <ul>
              <li>&&</li>
              <li>||</li>
              <li>!</li>
            </ul>

            <ul>
              <li>and</li>
              <li>or</li>
              <li>not</li>
            </ul>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
