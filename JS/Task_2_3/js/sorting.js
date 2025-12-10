// Global variable to hold the current array
let currentArray = [];

// Generate a random array of words
function generateRandomArray(size = 50) {
    const words = [
        'apple', 'banana', 'cherry', 'dragon', 'elephant', 'forest', 'garden',
        'house', 'island', 'jungle', 'kitchen', 'library', 'mountain', 'nature',
        'ocean', 'palace', 'queen', 'river', 'sunset', 'tiger', 'umbrella',
        'valley', 'window', 'xylophone', 'yellow', 'zebra', 'anchor', 'beach',
        'castle', 'desert', 'engine', 'flower', 'guitar', 'harbor', 'igloo',
        'jewel', 'knot', 'lamp', 'museum', 'needle', 'orange', 'piano',
        'quilt', 'rose', 'stone', 'temple', 'unity', 'violin', 'whisper',
        'xenial', 'yacht', 'zone', 'author', 'bridge', 'compass', 'diamond', 'eagle', 'factory', 'galaxy',
        'hammer', 'iceberg', 'jacket', 'kettle', 'ladder', 'marble', 'notebook',
        'orbit', 'pattern', 'quest', 'rainbow', 'shadow', 'thunder', 'umbrella',
        'valley', 'whisper', 'xray', 'yearbook', 'zenith', 'ability', 'balance',
        'calendar', 'demand', 'empire', 'forest', 'growth', 'horizon', 'illness',
        'jungle', 'kingdom', 'legend', 'mirror', 'network', 'option', 'promise'
    ];
    
    const array = [];
    for (let i = 0; i < size; i++) {
        array.push(words[Math.floor(Math.random() * words.length)]);
    }
    return array;
}


//Print the original array to the DOM
function generateNewArray() {
    currentArray = generateRandomArray(60);
    displayOriginalArray();
}

function displayOriginalArray() {
    const container = document.getElementById('originalArray');
    container.innerHTML = currentArray.map((item, index) => 
        `<span class="array-item">${item}</span>`
    ).join('');
}

function clearAllResults() {
    document.querySelectorAll('.result').forEach(el => {
        el.innerHTML = '';
    });
    document.querySelectorAll('.time').forEach(el => {
        el.innerHTML = '';
    });
}

// ==================== BUBBLE SORT ====================
function bubbleSort(arr) {
    const array = [...arr];
    const n = array.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j].localeCompare(array[j + 1]) > 0) {
                // Interschimbă elementele
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }
    return array;
}

// ==================== SELECTION SORT ====================
function selectionSort(arr) {
    const array = [...arr];
    const n = array.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        // Găsește indexul celui mai mic element
        for (let j = i + 1; j < n; j++) {
            if (array[j].localeCompare(array[minIndex]) < 0) {
                minIndex = j;
            }
        }
        
        // Interschimbă cu elementul curent
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
        }
    }
    return array;
}

// ==================== INSERTION SORT ====================
function insertionSort(arr) {
    const array = [...arr];
    
    for (let i = 1; i < array.length; i++) {
        const key = array[i];
        let j = i - 1;
        
        // Mută elementele mai mari decât key cu o poziție la dreapta
        while (j >= 0 && array[j].localeCompare(key) > 0) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = key;
    }
    return array;
}

// ==================== QUICKSORT ====================
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(el => el.localeCompare(pivot) < 0);
    const middle = arr.filter(el => el.localeCompare(pivot) === 0);
    const right = arr.filter(el => el.localeCompare(pivot) > 0);
    
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

// ==================== MERGE SORT ====================
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0;
    let j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i].localeCompare(right[j]) <= 0) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    
    return [...result, ...left.slice(i), ...right.slice(j)];
}

// ==================== RENDERING ALGORITHMS ====================
const algorithms = [
    {
        name: 'Bubble Sort',
        func: bubbleSort,
        complexity: 'O(n²)',
        bestCase: 'O(n)',
        description: 'Compares adjacent elements and swaps them. Simple but slow for large arrays.',
        emoji: '🫧'
    },
    {
        name: 'Selection Sort',
        func: selectionSort,
        complexity: 'O(n²)',
        bestCase: 'O(n²)',
        description: 'Finds the smallest element and places it in the correct position. Stable and easy to implement.',
        emoji: '🎯'
    },
    {
        name: 'Insertion Sort',
        func: insertionSort,
        complexity: 'O(n²)',
        bestCase: 'O(n)',
        description: 'Builds a sorted array incrementally. Very efficient for small arrays.',
        emoji: '📥'
    },
    {
        name: 'Quicksort',
        func: quickSort,
        complexity: 'O(n log n)',
        worstCase: 'O(n²)',
        description: 'Divide and conquer with pivot. Very fast in practice, used in many libraries.',
        emoji: '⚡'
    },
    {
        name: 'Merge Sort',
        func: mergeSort,
        complexity: 'O(n log n)',
        bestCase: 'O(n log n)',
        description: 'Stable divide and conquer. Guaranteed O(n log n), perfect for critical data.',
        emoji: '🔀'
    }
];

//Render algorithms to the DOM
function renderAlgorithms() {
    const container = document.getElementById('algorithmsContainer');
    container.innerHTML = algorithms.map((algo, index) => ` 
        <div class="algorithm-card">
            <h3>${algo.emoji} ${algo.name}</h3>
            <div class="complexity">
                <strong>Average time:</strong> ${algo.complexity}<br>
                <strong>Best case:</strong> ${algo.bestCase || algo.complexity}<br>
                ${algo.worstCase ? `<strong>Worst case:</strong> ${algo.worstCase}<br>` : ''}
                <strong>Space:</strong> O(1) - O(n)
            </div>
            <p class="description">${algo.description}</p>
            <button class="btn-sort" onclick="runSort(${index})">
                Sort with ${algo.name}
            </button>
            <div class="result" id="result-${index}"></div>
            <div class="time" id="time-${index}"></div>
        </div>
    `).join('');
}

// Run the selected sorting algorithm and display results
function runSort(algorithmIndex) {
    const algo = algorithms[algorithmIndex];
    const startTime = performance.now();
    const sorted = algo.func(currentArray);
    const endTime = performance.now();
    const time = (endTime - startTime).toFixed(4);
    
    const resultDiv = document.getElementById(`result-${algorithmIndex}`);
    const timeDiv = document.getElementById(`time-${algorithmIndex}`);
    
    resultDiv.innerHTML = sorted.map(item => 
        `<span class="array-item">${item}</span>`
    ).join('');
    
    timeDiv.innerHTML = `Execution time: ${time}ms`;
}