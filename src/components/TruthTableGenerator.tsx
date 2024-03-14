"use client";
import React, { useState } from "react";
import {
  Input,
  Button,
  Divider,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

import { PopoverExpressions, TruthTable } from ".";
import { TruthRow } from "@/interface";
import { FaInfo } from "react-icons/fa";
import toast from "react-hot-toast";

export const TruthTableGenerator = () => {
  const [vars, setVars] = useState<string[]>(["a", "b", "c"]);
  const [expressions, setExpressions] = useState<string[]>([
    "! ( a || b || c )",
    "(!a && !b && !c)",
  ]);

  const [showTable, setShowTable] = useState<boolean>(false);

  const [truthData, setTruthData] = useState<TruthRow[]>([]);

  const handleClick = () => {
    let len = vars.length;
    let splitBy = Math.round(len / 2);
    let trueSet;
    let trues = [];
    let newTruthData = [];

    try {
      newTruthData.push(truth(vars, vars, true));
      for (let i = 1; i <= splitBy; i++) {
        trueSet = reduceToCombinations(permut(vars, i));

        trueSet.forEach((truthSrc: any) => {
          trues = truth(vars, truthSrc);
          newTruthData.push(trues);
        });
      }
      newTruthData.push(truth(vars, vars));

      const transformedData: TruthRow[] = newTruthData.map((row, index) => {
        let rowData: TruthRow = { ...row };

        expressions.forEach((expr, exprIndex) => {
          let jsExpr = expr
            .replace(/and/g, "&&")
            .replace(/or/g, "||")
            .replace(/not/g, "!");

          vars.forEach((v) => {
            jsExpr = jsExpr.replace(new RegExp(v, "g"), String(rowData[v]));
          });

          rowData[`expr${exprIndex}`] = eval(jsExpr) ? 1 : 0;
        });

        return {
          key: index,
          ...rowData,
        };
      });

      setShowTable(true);
      setTruthData(transformedData);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (error) {
      toast.error("Variables o expresiones invalidas");
    }
  };

  const truth = (set: string[], truths: string[], reverse?: any) => {
    const w: any = {};

    set.forEach(
      (v: string) =>
        (w[v] = ((truths.indexOf(v) >= 0 ? true : false) as any) ^ reverse)
    );

    return w;
  };

  const permut: any = (arr: string[], c: number) => {
    var buf = [],
      len,
      arrSlice,
      permArr,
      proArr;
    if (c <= 1) {
      return arr;
    } else {
      len = arr.length;
      for (var i = 0; i < len; i++) {
        arrSlice = arr.slice(0, i).concat(arr.slice(i + 1));
        permArr = permut(arrSlice, c - 1);
        proArr = [];
        for (var y = 0; y < permArr.length; y++) {
          proArr.push([arr[i]].concat(permArr[y]).join(""));
        }
        buf.push(...proArr);
      }
    }
    return buf;
  };

  const reduceToCombinations = (arr: string[]) => {
    var i = 1,
      lastEl;

    arr = arr
      .map((v: any) => {
        return v.split("").sort().join("");
      })
      .sort();

    lastEl = arr[0];
    while (i < arr.length) {
      if (arr[i] == lastEl) {
        arr.splice(i, 1);
      } else {
        lastEl = arr[i];
        i++;
      }
    }

    arr = arr.map((v: any) => {
      return v.split("");
    });

    return arr;
  };

  const isInvalidForm = vars.includes("") || expressions.includes("");

  return (
    <div className="grid gap-2">
      {showTable ? (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: [0, 1.2, 1],
          }}
          transition={{
            duration: 0.5,
          }}
          className="overflow-x-auto grid gap-2"
        >
          <div className="relative flex justify-center">
            <h2 className="text-center text-2xl font-bold">Tabla de verdad</h2>
            <div className="absolute right-0 self-center">
              <PopoverExpressions />
            </div>
          </div>

          <TruthTable
            vars={vars}
            expressions={expressions}
            truthData={truthData}
          />

          <Divider />

          <Button
            variant="flat"
            color="secondary"
            className="w-full"
            size="lg"
            onClick={() => setShowTable(false)}
          >
            Volver al formulario
          </Button>
        </motion.div>
      ) : (
        <div className="max-w-[600px] grid gap-2 mt-10">
          <h2 className="text-center text-2xl font-bold">
            Generador de Tabla de verdad
          </h2>

          <div className="flex gap-x-4 gap-y-2 max-md:flex-col">
            <Input
              value={vars.join(",")}
              onChange={(e) => setVars(e.target.value.split(","))}
              label="Variables"
              description="(separadas por coma)"
            />

            <Input
              value={expressions.join(",")}
              onChange={(e) => setExpressions(e.target.value.split(","))}
              label="Expresiones"
              description="(separadas por coma)"
              endContent={<PopoverExpressions />}
            />
          </div>
          <Divider />
          <Button
            isDisabled={isInvalidForm}
            variant="flat"
            color="success"
            className="w-full"
            size="lg"
            onClick={handleClick}
          >
            Generar tabla de verdad
          </Button>
          <div className="">
            <small>
              La tabla de verdad es una herramienta que permite visualizar el
              resultado de una expresión lógica para todas las combinaciones
              posibles de sus variables.
            </small>
          </div>
        </div>
      )}
    </div>
  );
};
