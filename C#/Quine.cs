using System;

namespace Quine
{
    class Program
    {
        static void Main(string[] args)
        {
            string text = "using System;{0}{0}namespace Quine{0}{{{0}{1}class Program{0}{1}{{{0}{1}{1}static void Main(string[] args){0}{1}{1}{{{0}{1}{1}{1}string text = {2};{0}{1}{1}{1}Console.WriteLine(text, ((char)13).ToString() + ((char)10).ToString(), ((char)9).ToString(), ((char)34) + text + ((char)34));{0}{1}{1}{1}Console.ReadKey();{0}{1}{1}}}{0}{1}}}{0}}}";
            Console.WriteLine(text, ((char)13).ToString() + ((char)10).ToString(), ((char)9).ToString(), ((char)34) + text + ((char)34));
            Console.ReadKey();
        }
    }
}
