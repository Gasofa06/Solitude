import fill
import build

if __name__ == "__main__":
    fill.Main()

    # The size of each group must be 100KB.
    target_size = 100 * 1000
    build.Main(target_size)